export const usersTable = sqliteTable('users_table', {
  id: int().primaryKey({ autoIncrement: true }),
  nickname: text().notNull(),
  phone: text().notNull(),
})
