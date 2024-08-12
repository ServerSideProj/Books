using Microsoft.AspNetCore.Mvc;
using Backend.BL;
using System.Collections.Generic;
using Backend.DAL;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TransactionController : ControllerBase
    {
        [HttpPost("create")]
        public IActionResult CreateTransaction([FromBody] Transaction transaction)
        {
            try
            {
                Transaction.CreateTransaction(transaction.SalerEmail, transaction.BuyerEmail, transaction.CoinsOffer, transaction.CopyId, transaction.BookId);
                return Ok(new { Message = "Transaction created successfully." });
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(new { Error = ex.Message });
            }
        }

        [HttpPost("accept/{transactionId}")]
        public IActionResult AcceptTransaction(int transactionId)
        {
            try
            {
                Transaction.AcceptTransaction(transactionId);
                return Ok(new { Message = "Transaction accepted successfully." });
            }
            catch (Exception ex)
            {
                return BadRequest(new { Error = ex.Message });
            }
        }

        [HttpPost("decline/{transactionId}")]
        public IActionResult DeclineTransaction(int transactionId)
        {
            try
            {
                Transaction.DeclineTransaction(transactionId);
                return Ok(new { Message = "Transaction declined successfully." });
            }
            catch (Exception ex)
            {
                return BadRequest(new { Error = ex.Message });
            }
        }

        [HttpGet("seller-transactions/{salerEmail}")]
        public IActionResult GetTransactionsForSeller(string salerEmail)
        {
            if (string.IsNullOrEmpty(salerEmail))
            {
                return BadRequest("Seller email is required.");
            }

            IEnumerable<object> transactions = Transaction.GetTransactionsForSeller(salerEmail);

            if (transactions == null)
            {
                return NotFound("No transactions found for the provided seller email.");
            }

            return Ok(transactions);
        }
    }
}
