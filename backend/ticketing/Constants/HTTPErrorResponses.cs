namespace ticketing.Constants
{
    public static class HTTPErrorResponses
    {
        public static readonly object InternalServerError = new { message = "Unknown error has occured" };

        public static readonly object Unauthorized = new { message = "You are not authorized" };
    }
}