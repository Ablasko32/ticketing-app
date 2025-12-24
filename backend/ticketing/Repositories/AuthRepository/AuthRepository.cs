using System.Security.Claims;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using ticketing.Constants;
using ticketing.DTOs;
using ticketing.Models;
using ticketing.Repositories.Interface;

namespace ticketing.Repositories
{
    public class AuthRepository : IAuthRepository
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManager;

        public AuthRepository(UserManager<AppUser> userManager, SignInManager<AppUser> signInManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
        }

        public async Task<IdentityResult> RegisterAdminAsync(RegisterAdminDTO registerData)
        {
            var user = new AppUser
            {
                Email = registerData.Email,
                UserName = registerData.Email,
                OrganizationName = registerData.OrganizationName
            };

            var result = await _userManager.CreateAsync(user, registerData.Password);

            if (result.Succeeded)
            {
                var roleResult = await _userManager.AddToRoleAsync(user, UserRoles.Admin);
                return roleResult;
            }
            return result;
        }

        public async Task<SignInResult> LoginAsync(LoginDTO loginData)
        {
            return await _signInManager.PasswordSignInAsync(loginData.Email, loginData.Password, isPersistent: true, lockoutOnFailure: false);
        }

        public async Task LogoutAsync()
        {
            await _signInManager.SignOutAsync();
        }

        public async Task<IdentityResult> RegisterUserAsync(RegisterUserDTO registerUserData, string organizationName)
        {
            var user = new AppUser
            {
                Email = registerUserData.Email,
                UserName = registerUserData.Email,
                OrganizationName = organizationName
            };

            var result = await _userManager.CreateAsync(user, registerUserData.Password);
            if (result.Succeeded)
            {
                var roleResult = await _userManager.AddToRoleAsync(user, registerUserData.Role.ToLower());
                return roleResult;
            }
            return result;
        }

        public async Task<AppUser?> GetUserAsync(ClaimsPrincipal principal)
        {
            return await _userManager.GetUserAsync(principal);
        }

        public async Task<bool> IsOrganizationTameTakenAsync(string organizationName)
        {
            return await _userManager.Users.AnyAsync(u => u.OrganizationName.ToLower() == organizationName.ToLower());
        }
    }
}