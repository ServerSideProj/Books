
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Net;
using Backend.BL;

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

        public int GetRecentTransactionCount(string buyerEmail, string salerEmail)
        {
            using (SqlConnection con = connect("myProjDB"))
            {
                SqlCommand cmd = new SqlCommand("sp_GetRecentTransactionCount", con);
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.AddWithValue("@BuyerEmail", buyerEmail);
                cmd.Parameters.AddWithValue("@SalerEmail", salerEmail);

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

        public IEnumerable<object> GetTransactionsForSeller(string salerEmail)
        {
            var transactions = new List<object>();

            using (SqlConnection con = connect("myProjDB"))
            {
                using (SqlCommand cmd = new SqlCommand("sp_GetTransactionsForSeller", con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@salerEmail", salerEmail);

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            var transaction = new
                            {
                                TransactionId = reader.GetInt32(reader.GetOrdinal("transactionId")),
                                SalerEmail = reader.GetString(reader.GetOrdinal("salerEmail")),
                                BuyerEmail = reader.GetString(reader.GetOrdinal("buyerEmail")),
                                CoinsOffer = reader.GetDecimal(reader.GetOrdinal("coinsOffer")),
                                CopyId = reader.GetInt32(reader.GetOrdinal("copyId")),
                                BookId = reader.GetInt32(reader.GetOrdinal("bookId")),
                                IsActive = reader.GetBoolean(reader.GetOrdinal("isActive")),
                                IsAccepted = reader.GetBoolean(reader.GetOrdinal("isAccepted")),
                                TransactionDate = reader.GetDateTime(reader.GetOrdinal("transactionDate")),
                                OwnerEmail = reader.GetString(reader.GetOrdinal("ownerEmail")),
                                IsForSale = reader.GetBoolean(reader.GetOrdinal("isForSale")),
                                Title = reader.GetString(reader.GetOrdinal("title")),
                                ImageLink = reader.GetString(reader.GetOrdinal("imageLink")),
                                authors = GetAuthorsByBookId(reader.GetInt32(reader.GetOrdinal("bookId"))),
                                username = reader.GetString(reader.GetOrdinal("username"))

                            };

                            transactions.Add(transaction);
                        }
                    }
                }
            }

            return transactions;
        }

        private List<Author> GetAuthorsByBookId(int bookId)
        {
            List<Author> authors = new List<Author>();

            using (SqlConnection con = connect("myProjDB"))
            {
                SqlCommand cmd = new SqlCommand("sp_GetAuthorsByBookId", con);
                cmd.CommandType = CommandType.StoredProcedure;

                cmd.Parameters.AddWithValue("@BookId", bookId);

                using (SqlDataReader reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        authors.Add(new Author(
                            id: Convert.ToInt32(reader["id"]),
                            name: reader["name"].ToString(),
                            biography: reader["biography"].ToString(),
                            wikiLink: reader["wikiLink"].ToString(),
                            pictureUrl: reader["PictureUrl"].ToString()
                        ));
                    }
                }
            }

            return authors;
        }

    }
}