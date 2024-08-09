using Microsoft.AspNetCore.Mvc;
using Backend.BL;
using System.Collections.Generic;
using System.Text.Json;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        // POST api/users/register
        [HttpPost("register")]
        public ActionResult<object> Register([FromBody] Users user)
        {
            string result = user.Register();
            if (result == "Registration successful.")
            {
                var response = new
                {
                    username = user.Username,
                    email = user.Email,
                    profileImageLink = "",
                    coins = 0,
                    message = result
                };
                return Ok(response);
            }
            else
            {
                return BadRequest(new { message = result });
            }
        }


        // POST api/users/login
        [HttpPost("login")]
        public ActionResult<Users> Login([FromBody] JsonElement loginData)
        {
            if (!loginData.TryGetProperty("Email", out JsonElement emailElement) ||
                !loginData.TryGetProperty("Password", out JsonElement passwordElement))
            {
                return BadRequest("Email or Password is missing.");
            }

            string email = emailElement.GetString();
            string password = passwordElement.GetString();

            if (string.IsNullOrEmpty(email) || string.IsNullOrEmpty(password))
            {
                return BadRequest("Email or Password cannot be null.");
            }

            Users loggedInUser = Users.Login(email, password);
            if (loggedInUser != null)
            {
                return Ok(loggedInUser);
            }
            else
            {
                return Unauthorized("Invalid email or password.");
            }
        }

        // GET api/users/usernames
        [HttpGet("usernames")]
        public ActionResult<List<string>> GetAllUsernames()
        {
            List<string> usernames = Users.GetAllUsernames();
            return Ok(usernames);
        }

        // GET api/users
        [HttpGet]
        public ActionResult<List<Users>> GetAllUsers()
        {
            List<Users> users = Users.GetAllUsers();
            return Ok(users);
        }

        [HttpGet("followers/{email}")]
        public ActionResult<List<Users>> GetFollowers(string email)
        { 
            List<Users> followers = Users.GetFollowers(email);
            return Ok(followers);
        }

        [HttpGet("followedBy/{email}")]
        public ActionResult<List<Users>> GetUsersFollowedBy(string email)
        {
            List<Users> followedUsers = Users.GetUsersFollowedBy(email);
            return Ok(followedUsers);
        }

        // POST api/users/addFriend
        [HttpPost("addFriend")]
        public ActionResult AddFriend([FromBody] JsonElement requestData)
        {
            if (!requestData.TryGetProperty("FollowerEmail", out JsonElement followerElement) ||
                !requestData.TryGetProperty("FollowingEmail", out JsonElement followingElement))
            {
                return BadRequest("FollowerEmail or FollowingEmail is missing.");
            }

            string followerEmail = followerElement.GetString();
            string followingEmail = followingElement.GetString();

            if (string.IsNullOrEmpty(followerEmail) || string.IsNullOrEmpty(followingEmail))
            {
                return BadRequest("FollowerEmail or FollowingEmail cannot be null or empty.");
            }

            int result = Users.AddFriend(followerEmail, followingEmail);

            switch (result)
            {
                case -1:
                    return BadRequest("User cannot follow themselves.");
                case -2:
                    return BadRequest("This user is already followed by you.");
                case 0:
                    return Ok("Friend added successfully.");
                default:
                    return StatusCode(500, "An unknown error occurred.");
            }
        }

        // PUT api/users/changePassword
        [HttpPut("changePassword")]
        public ActionResult ChangePassword([FromBody] JsonElement requestData)
        {
            if (!requestData.TryGetProperty("Email", out JsonElement emailElement) ||
                !requestData.TryGetProperty("OldPassword", out JsonElement oldPasswordElement) ||
                !requestData.TryGetProperty("NewPassword", out JsonElement newPasswordElement))
            {
                return BadRequest("Email, OldPassword, or NewPassword is missing.");
            }

            string email = emailElement.GetString();
            string oldPassword = oldPasswordElement.GetString();
            string newPassword = newPasswordElement.GetString();

            if (string.IsNullOrEmpty(email) || string.IsNullOrEmpty(oldPassword) || string.IsNullOrEmpty(newPassword))
            {
                return BadRequest("Email, OldPassword, or NewPassword cannot be null or empty.");
            }

            int result = Users.ChangePassword(email, oldPassword, newPassword);

            if (result == -1)
            {
                return BadRequest("The old password is incorrect.");
            }
            else if (result == 0)
            {
                return Ok("Password changed successfully.");
            }
            else
            {
                return StatusCode(500, "An unknown error occurred.");
            }
        }

        [HttpDelete("{email}")]
        public IActionResult DeleteUser(string email)
        {
            try
            {
                Users.DeleteUser(email);
                return Ok(new { Message = "User deleted successfully." });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Error = ex.Message });
            }

        }

        [HttpPost("UploadProfileImage")]
        public async Task<IActionResult> UploadProfileImage([FromForm] IFormFile file, [FromForm] string email)
        {
            if (file == null || file.Length == 0)
            {
                return BadRequest("No file uploaded.");
            }

            string path = Path.Combine(Directory.GetCurrentDirectory(), "UploadedFiles");

            // Ensure the directory exists
            if (!Directory.Exists(path))
            {
                Directory.CreateDirectory(path);
            }

            // Generate a unique filename
            var uniqueFileName = $"{email}_{Guid.NewGuid()}{Path.GetExtension(file.FileName)}";
            var filePath = Path.Combine(path, uniqueFileName);

            // Save the file
            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            // Update the user's profile image in the database
            Users.UpdateProfileImage(email, uniqueFileName);

            // Return status code and the image link
            return Ok(new { ImageName = uniqueFileName });
        }

    }
}
