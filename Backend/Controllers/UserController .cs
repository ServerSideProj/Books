﻿using Microsoft.AspNetCore.Mvc;
using Backend.BI;
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
        public ActionResult<string> Register([FromBody] Users user)
        {
            string result = user.Register();
            if (result == "Registration successful.")
            {
                return Ok(result);
            }
            else
            {
                return BadRequest(result);
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

        [HttpPut("updateProfileImage")]
        public ActionResult UpdateProfileImage([FromBody] JsonElement requestData)
        {
            if (!requestData.TryGetProperty("Email", out JsonElement emailElement) ||
                !requestData.TryGetProperty("ProfileImage", out JsonElement profileImageElement))
            {
                return BadRequest("Email or ProfileImage is missing.");
            }

            string email = emailElement.GetString();
            string profileImageLink = profileImageElement.GetString();

            if (string.IsNullOrEmpty(email) || string.IsNullOrEmpty(profileImageLink))
            {
                return BadRequest("Email or ProfileImage cannot be null or empty.");
            }

            Users.UpdateProfileImage(email, profileImageLink);
            return Ok("Profile image updated successfully.");
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
            Users user = new Users(email, "", "", ""); // Dummy instance to call the method
            List<Users> followers = user.GetFollowers();
            return Ok(followers);
        }

        [HttpGet("followedBy/{email}")]
        public ActionResult<List<Users>> GetUsersFollowedBy(string email)
        {
            Users user = new Users(email, "", "", ""); // Dummy instance to call the method
            List<Users> followedUsers = user.GetUsersFollowedBy();
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
    }
}
