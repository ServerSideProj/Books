
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using Backend.BL;
using Backend.BI;

namespace Backend.DAL
{
    public class DBtransaction : DBservices
    {
        public int GetLastRejectedOffer(string buyerEmail, int copyId, int bookId)
        {
            using (SqlConnection con = connect("myProjDB"))
            {
                SqlCommand cmd = new SqlCommand("sp_GetLastRejectedOffer", con);
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.AddWithValue("@BuyerEmail", buyerEmail);
                cmd.Parameters.AddWithValue("@CopyId", copyId);
                cmd.Parameters.AddWithValue("@BookId", bookId);

                object result = cmd.ExecuteScalar();
                return cmd.ExecuteScalar() != null ? Convert.ToInt32(result) : 0;
            }
        }

        public int GetRecentTransactionCount(string buyerEmail)
        {
            using (SqlConnection con = connect("myProjDB"))
            {
                SqlCommand cmd = new SqlCommand("sp_GetRecentTransactionCount", con);
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.AddWithValue("@BuyerEmail", buyerEmail);

                return Convert.ToInt32(cmd.ExecuteScalar());
            }
        }

        public void CreateTransaction(string salerEmail, string buyerEmail, decimal coinsOffer, int copyId, int bookId)
        {
            using (SqlConnection con = connect("myProjDB"))
            {
                SqlCommand cmd = new SqlCommand("sp_CreateTransaction", con);
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.AddWithValue("@SalerEmail", salerEmail);
                cmd.Parameters.AddWithValue("@BuyerEmail", buyerEmail);
                cmd.Parameters.AddWithValue("@CoinsOffer", coinsOffer);
                cmd.Parameters.AddWithValue("@CopyId", copyId);
                cmd.Parameters.AddWithValue("@BookId", bookId);

                cmd.ExecuteNonQuery();
            }
        }

        public void AcceptTransaction(int transactionId)
        {
            using (SqlConnection con = connect("myProjDB"))
            {
                SqlCommand cmd = new SqlCommand("sp_AcceptTransaction", con);
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.AddWithValue("@TransactionId", transactionId);

                cmd.ExecuteNonQuery();
            }
        }

        public Transaction GetTransactionById(int transactionId)
        {
            using (SqlConnection con = connect("myProjDB"))
            {
                SqlCommand cmd = new SqlCommand("sp_GetTransactionById", con);
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.AddWithValue("@TransactionId", transactionId);

                using (SqlDataReader reader = cmd.ExecuteReader())
                {
                    if (reader.Read())
                    {
                        return new Transaction(
                            transactionId: Convert.ToInt32(reader["transactionId"]),
                            salerEmail: reader["salerEmail"].ToString(),
                            buyerEmail: reader["buyerEmail"].ToString(),
                            coinsOffer: Convert.ToDecimal(reader["coinsOffer"]),
                            copyId: Convert.ToInt32(reader["copyId"]),
                            bookId: Convert.ToInt32(reader["bookId"])
                        );
                    }
                }
            }
            return null;
        }

        public List<Transaction> GetPendingTransactions(string buyerEmail)
        {
            List<Transaction> transactions = new List<Transaction>();

            using (SqlConnection con = connect("myProjDB"))
            {
                SqlCommand cmd = new SqlCommand("sp_GetPendingTransactions", con);
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.AddWithValue("@BuyerEmail", buyerEmail);

                using (SqlDataReader reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        transactions.Add(new Transaction(
                            transactionId: Convert.ToInt32(reader["transactionId"]),
                            salerEmail: reader["salerEmail"].ToString(),
                            buyerEmail: reader["buyerEmail"].ToString(),
                            coinsOffer: Convert.ToDecimal(reader["coinsOffer"]),
                            copyId: Convert.ToInt32(reader["copyId"]),
                            bookId: Convert.ToInt32(reader["bookId"])
                        ));
                    }
                }
            }
            return transactions;
        }

        public void DeleteTransaction(int transactionId)
        {
            using (SqlConnection con = connect("myProjDB"))
            {
                SqlCommand cmd = new SqlCommand("sp_DeleteTransaction", con);
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.AddWithValue("@TransactionId", transactionId);

                cmd.ExecuteNonQuery();
            }
        }

        public void DeclineTransaction(int transactionId)
        {
            using (SqlConnection con = connect("myProjDB"))
            {
                SqlCommand cmd = new SqlCommand("sp_DeclineTransaction", con);
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.AddWithValue("@TransactionId", transactionId);

                cmd.ExecuteNonQuery();
            }
        }
    }
}