using System;
using System.Collections.Generic;
using System.Security.Principal;

namespace Domain.Interfaces
{
    /// <summary>
    /// Represents an application user with personal information.
    /// </summary>
    public interface IApplicationUser : IIdentity, IBaseEntity, ITrackableEntity
    {
        /// <summary>
        /// Gets or sets the first name of the user.
        /// </summary>
        public string FirstName { get; set; }

        /// <summary>
        /// Gets or sets the last name of the user.
        /// </summary>
        public string LastName { get; set; }

        /// <summary>
        /// Gets or sets the email address of the user.
        /// </summary>
        public string? Email { get; set; }

        /// <summary>
        /// Gets or sets the username of the user.
        /// </summary>
        public string UserName { get; set; }

        /// <summary>
        /// Gets or sets the biography of the user.
        /// </summary>
        public string? Bio { get; set; }

        /// <summary>
        /// Gets or sets the profile picture URL of the user.
        /// </summary>
        public string? ProfilePicture { get; set; }

        /// <summary>
        /// Gets or sets the phone number of the user.
        /// </summary>
        public string? PhoneNumber { get; set; }

        /// <summary>
        /// Gets or sets the date of birth of the user.
        /// </summary>
        public DateTime? DateOfBirth { get; set; }

        /// <summary>
        /// Gets or sets a value indicating whether the user is active.
        /// </summary>
        public bool IsActive { get; set; }
    }
}
