import { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import TransactionEntry from "../components/TransactionEntry";

const ExpensePage = () => {
  // userid = "8ae699bf-d8fc-48e9-915c-96daeb5a5fd6";
  const [transactions, setTransactions] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const observer = useRef();

  // for lazy loading, whenever the last(10th) transaction is on the screen the function is called and data is fetched
  const lastTransactionElementRef = useCallback(
    (node) => {
      if (isLoading) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          setPage((prevPage) => prevPage + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [isLoading, hasMore]
  );

  useEffect(() => {
    const fetchExpenses = async () => {
      if (!hasMore || isLoading) return;

      setIsLoading(true);

      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_API_BASE_URL
          }/api/transactions?type=EXPENSE&page=${page}&limit=10`
        );

        const { transactions: newTransactions, totalPages } = response.data;

        setTransactions((prev) => {
            const uniqueTransactions = newTransactions.filter(
                newTx => !prev.some(prevTx => prevTx.id === newTx.id)
            );
            return [...prev, ...uniqueTransactions];
        });
        setHasMore(page < totalPages);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchExpenses();

    //extra
    return () => {
        if(observer.current) {
            observer.current.disconnect();
        }
    };

  }, [page]);

  return (
    <>
      <div className="expenses-page">
        <h1 className="">Expenses</h1>
        <div className="flex flex-col gap-4">
          {transactions.map((tx, index) => {
            if (transactions.length == index + 1) {
              return (
                <div ref={lastTransactionElementRef} key={tx.id}>
                  <TransactionEntry transaction={tx} index={index} type="EXPENSE"/>
                </div>
              );
            } else {
              return (
                <TransactionEntry key={tx.id} transaction={tx} index={index} type="EXPENSE" />
              );
            }
          })}
        </div>

        {isLoading && (
          <p className="text-center text-gray-500 mt-4">
            Loading more transactions...
          </p>
        )}
        {!hasMore && transactions.length > 0 && (
          <p className="text-center text-gray-500 mt-6">
            You've reached the end. ✅
          </p>
        )}
        {!isLoading && transactions.length === 0 && (
          <p className="text-center text-gray-500 mt-6">
            No expense transactions found.
          </p>
        )}
      </div>
    </>
  );
};

export default ExpensePage;
