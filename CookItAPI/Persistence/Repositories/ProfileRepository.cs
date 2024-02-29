using Microsoft.EntityFrameworkCore;
using Persistence.Context;
using Persistence.Models;
using Shared.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;




namespace Persistence.Repositories
{
    
    //profile repo interface
    public interface IProfileRepository
    {
        Task<ProfileModel> GetProfileModelAsync(int profileID);
        Task<ProfileModel> GetProfileByProfileIdAsync(int profileId, int userID);
        Task<ProfileModel> EditProfileAsync(ProfileModel profile, int userID);
        Task<ProfileModel> UploadProfileImageAsync(string imageURL, int userID);
        Task<bool> FollowAsync(int profileID, int userID);
        Task<bool> UnfollowAsync(int profileID, int userID);


    }

    //profile repo class. gets profile, edit profile, etc. (Crud func)
    public class ProfileRepository : IProfileRepository
    {
        private readonly SqlServerContext _context;

        public ProfileRepository(SqlServerContext context)
        {
            _context = context;
        }

        /// <summary>
        /// fetches profile from db
        /// </summary>
        /// <param name="profileID"></param>
        /// <returns></returns>
        public async Task<ProfileModel> GetProfileModelAsync(int userID)
        {
            var profile = await _context.Profiles
                    .Where(profile => profile.UserId == userID)
                    .Include(profile => profile.Posts)
                        .ThenInclude(post => post.Comments)
                    .SingleOrDefaultAsync();
            return profile;
        }

        public async Task<ProfileModel> GetProfileByProfileIdAsync(int profileId, int userID)
        {
            var profile = await _context.Profiles
                            .Where(profile => profile.Id == profileId) 
                            .Include(profile => profile.Posts)
                                .ThenInclude(post => post.Comments)
                            .SingleOrDefaultAsync();

            var userProfile = await _context.Profiles
                        .SingleOrDefaultAsync(x => x.UserId == userID); 

            if (userProfile != null)
            {
                var isFollowing = await _context.Follower
                                     .AnyAsync(f => f.FollowerID == userProfile.Id && f.ProfileID == profileId);

                profile.IsFollowedByUser = isFollowing;
            }

            return profile; 
        }



        public async Task<ProfileModel> EditProfileAsync(ProfileModel profile, int userID)
        {
            var updatedProfile = await _context.Profiles.Include("Posts").SingleOrDefaultAsync(profile => profile.UserId == userID);

            updatedProfile.FullName = profile.FullName;
            updatedProfile.Bio = profile.Bio;

            _context.SaveChanges();

            return updatedProfile;
        }

        public async Task<ProfileModel> UploadProfileImageAsync(string imageURL, int userID)
        {
            var profile = await _context.Profiles.Include("Posts").SingleOrDefaultAsync(p => p.UserId == userID);
            profile.ProfilePicture = imageURL;
            await _context.SaveChangesAsync();
            return profile;
        }

        public async Task<bool> FollowAsync(int profileID, int userID)
        {
            using var transaction = _context.Database.BeginTransaction();
            try
            {
                var userProfile = await _context.Profiles.FirstOrDefaultAsync(x => x.UserId == userID);

                var follower = new FollowerModel
                {
                    FollowerID = userProfile.Id,
                    ProfileID = profileID,
                };

                _context.Follower.Add(follower);
                await _context.SaveChangesAsync();

                var profileBeingFollowed = await _context.Profiles.FindAsync(profileID);
                if (profileBeingFollowed != null)
                {
                    profileBeingFollowed.FollowerCount += 1;
                    _context.Profiles.Update(profileBeingFollowed);
                }

                if (userProfile != null)
                {
                    userProfile.FollowingCount += 1;
                    _context.Profiles.Update(userProfile);
                }

                await _context.SaveChangesAsync();
                await transaction.CommitAsync();

                return true;
            }
            catch (Exception ex)
            {
                await transaction.RollbackAsync();
                return false;
            }
        }

        public async Task<bool> UnfollowAsync(int profileID, int userID)
        {
            using var transaction = _context.Database.BeginTransaction();
            try
            {
                var userProfile = await _context.Profiles.FirstOrDefaultAsync(x => x.UserId == userID);
                if (userProfile == null)
                {
                    return false; 
                }

                var followerRecord = await _context.Follower
                    .FirstOrDefaultAsync(f => f.FollowerID == userProfile.Id && f.ProfileID == profileID);

                if (followerRecord == null)
                {
                    return false; 
                }

                _context.Follower.Remove(followerRecord);
                await _context.SaveChangesAsync();

                var profileBeingUnfollowed = await _context.Profiles.FindAsync(profileID);
                if (profileBeingUnfollowed != null && profileBeingUnfollowed.FollowerCount > 0)
                {
                    profileBeingUnfollowed.FollowerCount -= 1;
                    _context.Profiles.Update(profileBeingUnfollowed);
                }

                if (userProfile.FollowingCount > 0)
                {
                    userProfile.FollowingCount -= 1;
                    _context.Profiles.Update(userProfile);
                }

                await _context.SaveChangesAsync();
                await transaction.CommitAsync();

                return true;
            }
            catch (Exception ex)
            {
                await transaction.RollbackAsync();
                return false;
            }
        }


    }
}
