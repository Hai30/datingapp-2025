using API.Entities;
using API.Helpers;

namespace API.Interfaces;

public interface IMemberRepository
{
    void Update(Member member);
    Task<bool> SaveAllAsync();
    Task<PaginatedResult<Member>> GetMembersAsync(MemberParams memberParams);
    Task<Member?> GetMemberByIdAsync(string Id);
    Task<IReadOnlyList<Photo>> GetPhotosForMemberAsync(string MemberId);
    Task<Member?> GetMemberForUpdate(string Id);
}
