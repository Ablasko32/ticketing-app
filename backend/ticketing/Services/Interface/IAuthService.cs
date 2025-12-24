using Microsoft.AspNetCore.Identity;
using ticketing.DTOs;

namespace ticketing.Services.Interface
{
    public interface IAuthService
    {
        Task<IdentityResult> RegisterAdminAsync(RegisterAdminDTO registerData);

        Task<SignInResult> LoginAsync(LoginDTO loginData);

        Task LogoutAsync();

        Task<IdentityResult> RegisterUserAsync(RegisterUserDTO registerUserData);
    }
}