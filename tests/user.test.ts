describe('User creation', () => {
  it('should not allow blacklisted user', async () => {
    // mock isBlacklisted to return true
    // call /api/users
    // expect 400
  });

  it('should create user if not blacklisted', async () => {
    // mock isBlacklisted to return false
    // expect 201
  });
});
