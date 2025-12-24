using System.Security.Claims;
using Microsoft.AspNetCore.Identity;
using ticketing.DTOs;
using ticketing.Repositories.Interface;
using ticketing.Services.Interface;

namespace ticketing.Services
{
    public class AuthService : IAuthService
    {
        private readonly IAuthRepository _authRepository;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public AuthService(IAuthRepository authRepository, IHttpContextAccessor httpContextAccessor)
        {
            _authRepository = authRepository;
            _httpContextAccessor = httpContextAccessor;
        }

        public async Task<IdentityResult> RegisterAdminAsync(RegisterAdminDTO registerData)
        {
            var isOrganizationNameTaken = await _authRepository.IsOrganizationTameTakenAsync(registerData.OrganizationName);

            if (isOrganizationNameTaken)
            {
                return IdentityResult.Failed(new IdentityError { Description = "Organization name is already in use" });
            }

            if (registerData.OrganizationName == "admin" || registerData.OrganizationName == "system")
            {
                return IdentityResult.Failed(new IdentityError { Description = "Invalid organization name" });
            }

            var result = await _authRepository.RegisterAdminAsync(registerData);

            return result;
        }

        public async Task<SignInResult> LoginAsync(LoginDTO loginData)
        {
            return await _authRepository.LoginAsync(loginData);
        }

        public async Task<IdentityResult> RegisterUserAsync(RegisterUserDTO registerUserData)
        {
            var user = _httpContextAccessor.HttpContext?.User;
            if (user == null)
            {
                return IdentityResult.Failed(new IdentityError { Description = "Error parsing user data" });
            }
            ;

            var adminUser = await _authRepository.GetUserAsync(user);
            if (adminUser == null)
            {
                return IdentityResult.Failed(new IdentityError { Description = "Error fetching user data" });
            }
            ;

            return await _authRepository.RegisterUserAsync(registerUserData, adminUser.OrganizationName);
        }

        public AuthStatusDTO GetAuthStatus()
        {
            var user = _httpContextAccessor.HttpContext?.User;
            if (user == null)
            {
                return new AuthStatusDTO
                {
                    IsAuthenticated = false,
                    Role = null,
                    Email = null,
                    UserId = null,
                    //TODO: Add OrganizationName to claims to be extracted from context
                    //OrganizationName = null 
                };
            }

            return new AuthStatusDTO
            {
                IsAuthenticated = user.Identity?.IsAuthenticated ?? false,
                Role = user.FindFirst(ClaimTypes.Role)?.Value,
                Email = user.FindFirst(ClaimTypes.Email)?.Value,
                UserId = user.FindFirst(ClaimTypes.NameIdentifier)?.Value,
                //OrganizationName = user.FindFirst("OrganizationName")?.Value
            };
        }

        public async Task LogoutAsync()
        {
            await _authRepository.LogoutAsync();
        }
    }
}