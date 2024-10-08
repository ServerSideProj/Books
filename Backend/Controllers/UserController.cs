﻿using Microsoft.AspNetCore.Mvc;
using Backend.BL;
using System.Collections.Generic;
using System.Text.Json;
using Backend.DAL;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {

        [HttpGet("usernamesAndEmails")]
        public ActionResult<List<Dictionary<string, string>>> GetAllUsernamesAndEmails([FromQuery] string excludeEmail)
        {
            List<Dictionary<string, string>> users = Users.GetAllUsernamesAndEmails(excludeEmail);
            return Ok(users);
        }

        [HttpGet("total-users-count")]
        public IActionResult GetTotalUsersCount()
        {
            try
            {
                int totalUsers = Users.GetTotalUsersCount();
                return Ok(new { TotalUsers = totalUsers });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Error = ex.Message });
            }
        }

        [HttpGet("all-users-admin")]
        public IActionResult GetAllUsersWithStats()
        {
            try
            {
                var users = Users.GetAllUsersWithStats();
                return Ok(users);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Error = ex.Message });
            }
        }


        [HttpGet("GetAllUsersWithActiveProp")]
        public ActionResult<List<object>> GetAllUsersWithActiveProp()
        {
            try
            {
                var usersWithActiveProp = Users.GetAllUsersWithActiveProp();
                return Ok(usersWithActiveProp);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Error = ex.Message });
            }
        }


        [HttpGet("username/{email}")]
        public ActionResult GetUsernameAndProfileImageByEmail(string email)
        {
            try
            {
                var user = Users.GetUsernameAndProfileImageByEmail(email);

                if (user.Username == null)
                {
                    return NotFound("User not found.");
                }

                return Ok(new { username = user.Username, profileImageLink = user.ProfileImageLink });
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error.");
            }
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

        [HttpGet("following/{email}")]
        public ActionResult<List<Users>> GetUsersFollowing(string email)
        {
            List<Users> followedUsers = Users.GetUsersFollowing(email);
            return Ok(followedUsers);
        }

        [HttpGet("daily-quiz/top-5-users-scores")]
        public IActionResult GetTop5UserScores()
        {
            List<UserScore> topScores = Users.GetTop5UserScores();

            if (topScores.Count == 0)
            {
                return Ok(new List<UserScore>());
            }

            return Ok(topScores);
        }

        [HttpPost("check-friendship-status")]
        public ActionResult CheckFriendshipStatus([FromBody] JsonElement requestData)
        {
            if (!requestData.TryGetProperty("FollowerEmail", out JsonElement followerElement) ||
                !requestData.TryGetProperty("FollowedAfter", out JsonElement followingElement))
            {
                return BadRequest("FollowerEmail or FollowedAfter is missing.");
            }

            string followerEmail = followerElement.GetString();
            string followedAfterEmail = followingElement.GetString();

            if (string.IsNullOrEmpty(followerEmail) || string.IsNullOrEmpty(followedAfterEmail))
            {
                return BadRequest("FollowerEmail or FollowedAfter cannot be null or empty.");
            }

            bool isFriend = Users.CheckIfFriends(followerEmail, followedAfterEmail);

            return Ok(new { isFriend });
        }


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



        [HttpPost("add-friend")]
        public ActionResult AddFriend([FromBody] JsonElement requestData)
        {
            if (!requestData.TryGetProperty("FollowerEmail", out JsonElement followerElement) ||
                !requestData.TryGetProperty("FollowedAfter", out JsonElement followedAfterElement))
            {
                return BadRequest("FollowerEmail or FollowedAfter is missing.");
            }

            string followerEmail = followerElement.GetString();
            string followedAfterEmail = followedAfterElement.GetString();

            if (string.IsNullOrEmpty(followerEmail) || string.IsNullOrEmpty(followedAfterEmail))
            {
                return BadRequest("FollowerEmail or FollowedAfter cannot be null or empty.");
            }

            int result = Users.AddFriend(followerEmail, followedAfterEmail);

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

        [HttpPost("remove-friend")]
        public ActionResult RemoveFriend([FromBody] JsonElement requestData)
        {
            if (!requestData.TryGetProperty("FollowerEmail", out JsonElement followerElement) ||
                !requestData.TryGetProperty("FollowedAfter", out JsonElement followedAfterElement))
            {
                return BadRequest("FollowerEmail or FollowedAfter is missing.");
            }

            string followerEmail = followerElement.GetString();
            string followedAfterEmail = followedAfterElement.GetString();

            if (string.IsNullOrEmpty(followerEmail) || string.IsNullOrEmpty(followedAfterEmail))
            {
                return BadRequest("FollowerEmail or FollowedAfter cannot be null or empty.");
            }

            int result = Users.RemoveFriend(followerEmail, followedAfterEmail);

            if (result == 0)
            {
                return Ok("Friend removed successfully.");
            }
            else
            {
                return BadRequest("This follow relationship does not exist.");
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

        [HttpPost("createNewUser")]
        public ActionResult CreateNewUser([FromBody] JsonElement newUser)
        {
            try
            {
                string username = newUser.GetProperty("Username").GetString();
                string email = newUser.GetProperty("Email").GetString();
                string password = newUser.GetProperty("Password").GetString();
                int coins = newUser.GetProperty("Coins").GetInt32();

                Users.CreateNewUser(username, email, password, coins);
                return Ok(new { Message = "User created successfully." });
            }
            catch (Exception ex)
            {
                return BadRequest(new { Error = ex.Message });
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


        [HttpPut("MakeUserActive")]
        public IActionResult MakeUserActive([FromBody] JsonElement requestData)
        {
            if (!requestData.TryGetProperty("Email", out JsonElement emailElement))
            {
                return BadRequest("Email is missing.");
            }

            string email = emailElement.GetString();

            if (string.IsNullOrEmpty(email))
            {
                return BadRequest("Email cannot be null or empty.");
            }

            try
            {
                Users.MakeUserActive(email);
                return Ok(new { Message = "User activated successfully." });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Error = ex.Message });
            }
        }

        [HttpPut("MakeUserInactive")]
        public IActionResult MakeUserInactive([FromBody] JsonElement requestData)
        {
            if (!requestData.TryGetProperty("Email", out JsonElement emailElement))
            {
                return BadRequest("Email is missing.");
            }

            string email = emailElement.GetString();

            if (string.IsNullOrEmpty(email))
            {
                return BadRequest("Email cannot be null or empty.");
            }

            try
            {
                Users.MakeUserInactive(email);
                return Ok(new { Message = "User deactivated successfully." });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Error = ex.Message });
            }
        }



    }
}
