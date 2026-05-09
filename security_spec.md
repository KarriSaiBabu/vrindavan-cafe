# Security Specification for Vrindavan Cafe

## Data Invariants
1. A menu item can only be created/modified by an admin.
2. A user profile can only be read/written by the owner (uid matches).
3. An order must have a valid `userId` matching the authenticated user.
4. Orders can only be updated by admins (status changes) or users (if specific conditions met, though usually orders are immutable for users after creation).
5. All price fields must be positive numbers.
6. Timestamp fields must be server-generated.

## The Dirty Dozen Payloads

1. **Identity Spoofing**: User A trying to create a profile for User B.
2. **Privilege Escalation**: User A trying to set `role: 'admin'` in their profile.
3. **Ghost Field Injection**: Adding `isVerified: true` to a profile update.
4. **Price Poisoning**: Setting a food item price to -100 or 0.
5. **Orphaned Order**: Creating an order without a linked user.
6. **State Bypassing**: User trying to mark an order as 'delivered'.
7. **Resource Poisoning**: Using a 1MB string as a category name.
8. **Unauthorized Read**: User A trying to read User B's order history.
9. **Bulk Scraping**: Trying to list all users in the system.
10. **Shadow Field creation**: Creating a menu item with extra hidden fields.
11. **Negative Quantity**: Adding -5 items to an order.
12. **Future Timestamp**: Sending a `createdAt` value in the future.

## Test Runner (Logic Check)
We will verify that these payloads return PERMISSION_DENIED.
