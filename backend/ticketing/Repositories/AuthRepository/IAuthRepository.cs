using System.Security.Claims;
using Microsoft.AspNetCore.Identity;
using ticketing.DTOs;
using ticketing.Models;

namespace ticketing.Repositories.Interface
{
    public interface IAuthRepository
    {
        Task<IdentityResult> RegisterAdminAsync(RegisterAdminDTO registerData);

        Task<bool> IsOrganizationTameTakenAsync(string organizationName);

        Task<SignInResult> LoginAsync(LoginDTO loginData);

        Task LogoutAsync();

        Task<IdentityResult> RegisterUserAsync(RegisterUserDTO registerUserData, string organizationName);

        Task<AppUser?> GetUserAsync(ClaimsPrincipal principal);
    }
}