using System.Security.Claims;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using ticketing.Models;

namespace ticketing.Data
{
    public class CustomClaimsFactory : UserClaimsPrincipalFactory<AppUser, IdentityRole>
    {
        public CustomClaimsFactory(
            UserManager<AppUser> userManager,
            RoleManager<IdentityRole> roleManager,
            IOptions<IdentityOptions> optionsAccessor)
            : base(userManager, roleManager, optionsAccessor)
        { }

        protected override async Task<ClaimsIdentity> GenerateClaimsAsync(AppUser user)
        {
            var identity = await base.GenerateClaimsAsync(user);
            identity.AddClaim(new Claim("OrganizationName", user.OrganizationName));

            var roles = await UserManager.GetRolesAsync(user);
            foreach(var role in roles)
            {
                identity.AddClaim(new Claim(ClaimTypes.Role, role));
            }

            return identity;
        }
    }
}