using Backend.DAL;
using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Data.SqlClient;

namespace Backend.BL
{
    public class Transaction
    {
        private int transactionId;
        private string salerEmail;
        private string buyerEmail;
        private decimal coinsOffer;
        private int copyId;
        private int bookId;
        private bool isActive;
        private bool isAccepted;
        private DateTime transactionDate;

        public Transaction(int transactionId, string salerEmail, string buyerEmail, decimal coinsOffer, int copyId, int bookId)
        {
            TransactionId = transactionId;
            SalerEmail = salerEmail;
            BuyerEmail = buyerEmail;
            CoinsOffer = coinsOffer;
            CopyId = copyId;
            BookId = bookId;
            IsActive = true;
            IsAccepted = false; 
            TransactionDate = DateTime.Now;
        }

        public int TransactionId { get => transactionId; set => transactionId = value; }
        public string SalerEmail { get => salerEmail; set => salerEmail = value; }
        public string BuyerEmail { get => buyerEmail; set => buyerEmail = value; }
        public decimal CoinsOffer { get => coinsOffer; set => coinsOffer = value; }
        public int CopyId { get => copyId; set => copyId = value; }
        public int BookId { get => bookId; set => bookId = value; }
        public bool IsActive { get => isActive; set => isActive = value; }
        public bool IsAccepted { get => isAccepted; set => isAccepted = value; }
        public DateTime TransactionDate { get => transactionDate; set => transactionDate = value; }

        private static readonly DBtransaction dbTransaction = new DBtransaction();
        private static readonly DBuser dbUser = new DBuser();

        public static void CreateTransaction(string salerEmail, string buyerEmail, decimal coinsOffer, int copyId, int bookId)
        {
            // Check if buyer has enough coins
            int buyerCoins = dbUser.GetUserCoins(buyerEmail);
            if (buyerCoins < coinsOffer)
            {
                throw new InvalidOperationException("Insufficient coins.");
            }

            // Check if buyer already has a rejected transaction for this book and offers more
            decimal lastOffer = dbTransaction.GetLastRejectedOffer(buyerEmail, copyId, bookId);
            if (lastOffer > 0 && coinsOffer <= lastOffer)
            {
                throw new InvalidOperationException("New offer must be greater than the last rejected offer.");
            }

            // Check if buyer has made more than 2 transactions in the last hour
            int transactionCount = dbTransaction.GetRecentTransactionCount(buyerEmail);
            if (transactionCount >= 2)
            {
                throw new InvalidOperationException("Transaction limit exceeded.");
            }

            // Create the transaction
            dbTransaction.CreateTransaction(salerEmail, buyerEmail, coinsOffer, copyId, bookId);
        }

        public static void AcceptTransaction(int transactionId)
        {
            // Accept the transaction
            dbTransaction.AcceptTransaction(transactionId);

            // Update coins
            var transaction = dbTransaction.GetTransactionById(transactionId);
            dbUser.UpdateUserCoins(transaction.BuyerEmail, -transaction.CoinsOffer);
            dbUser.UpdateUserCoins(transaction.SalerEmail, transaction.CoinsOffer);

            // Check and clean up pending transactions for the buyer
            List<Transaction> pendingTransactions = dbTransaction.GetPendingTransactions(transaction.BuyerEmail);
            foreach (var pendingTransaction in pendingTransactions)
            {
                int buyerCoins = dbUser.GetUserCoins(transaction.BuyerEmail);
                if (buyerCoins < pendingTransaction.CoinsOffer)
                {
                    dbTransaction.DeleteTransaction(pendingTransaction.TransactionId);
                }
            }
        }

        public static void DeclineTransaction(int transactionId)
        {
            dbTransaction.DeclineTransaction(transactionId);
        }
    }
}