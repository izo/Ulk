---
title: N+1 Query Problem
category: performance
impact: HIGH
impactDescription: 10-100x slower queries
tags: database, orm, queries, performance
---

## N+1 Query Problem

**Impact: HIGH (10-100x slower queries)**

The N+1 problem occurs when code executes N additional queries for N records, instead of batching them. With 100 records, this means 101 queries instead of 2.

**Incorrect (query in loop):**

```typescript
// Prisma - N+1
const users = await prisma.user.findMany()
for (const user of users) {
  const posts = await prisma.post.findMany({ where: { userId: user.id } })
  user.posts = posts // N queries for N users
}

// Sequelize - N+1
const users = await User.findAll()
for (const user of users) {
  user.posts = await Post.findAll({ where: { userId: user.id } })
}

// TypeORM - N+1
const users = await userRepository.find()
for (const user of users) {
  user.posts = await postRepository.find({ where: { userId: user.id } })
}
```

**Correct (eager loading / batching):**

```typescript
// Prisma - Include relation
const users = await prisma.user.findMany({
  include: { posts: true }  // 1 query with JOIN or 2 queries batched
})

// Sequelize - Eager loading
const users = await User.findAll({
  include: [{ model: Post }]
})

// TypeORM - Relations
const users = await userRepository.find({
  relations: ['posts']
})

// Manual batching with IN clause
const users = await prisma.user.findMany()
const userIds = users.map(u => u.id)
const posts = await prisma.post.findMany({
  where: { userId: { in: userIds } }
})
// Then map posts to users
```

**Detection:**

```bash
# Find loops with await inside (potential N+1)
grep -rn "for.*await\|\.forEach.*await\|\.map.*await" src/ --include="*.ts"

# Find findMany/findAll followed by another query
grep -A5 "findMany\|findAll" src/ --include="*.ts" | grep -E "find|query"

# Tools
# - Prisma query logging
# - Sequelize logging: true
# - pg-query-stream
# - express-query-counter middleware
```

**Remediation:**
1. Use ORM's include/relations option for eager loading
2. Batch queries with IN clauses
3. Use DataLoader for GraphQL resolvers
4. Add database query monitoring
5. Consider caching for repeated queries

**References:**
- [Prisma Relations](https://www.prisma.io/docs/concepts/components/prisma-client/relation-queries)
- [DataLoader Pattern](https://github.com/graphql/dataloader)
