import { test, expect } from '@playwright/test';

const BASE_URL = process.env.API_BASE_URL || 'https://jsonplaceholder.typicode.com';

test.describe('Posts API Tests', () => {
  test('should fetch all posts', async ({ request }) => {
    const response = await request.get('/posts');
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    const posts = await response.json();
    expect(Array.isArray(posts)).toBeTruthy();
    expect(posts.length).toBeGreaterThan(0);
    expect(posts[0]).toHaveProperty('id');
    expect(posts[0]).toHaveProperty('title');
    expect(posts[0]).toHaveProperty('body');
  });

  test('should fetch a single post by id', async ({ request }) => {
    const response = await request.get('/posts/1');
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    const post = await response.json();
    expect(post.id).toBe(1);
    expect(post).toHaveProperty('title');
    expect(post).toHaveProperty('body');
  });

  test('should create a new post', async ({ request }) => {
    const newPost = {
      title: 'Test Post',
      body: 'This is a test post body',
      userId: 1,
    };

    const response = await request.post('/posts', {
      data: newPost,
    });

    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(201);

    const createdPost = await response.json();
    expect(createdPost.title).toBe(newPost.title);
    expect(createdPost.body).toBe(newPost.body);
    expect(createdPost).toHaveProperty('id');
  });

  test('should update an existing post', async ({ request }) => {
    const updatedPost = {
      title: 'Updated Post',
      body: 'This is an updated post body',
      userId: 1,
    };

    const response = await request.put('/posts/1', {
      data: updatedPost,
    });

    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    const post = await response.json();
    expect(post.title).toBe(updatedPost.title);
    expect(post.body).toBe(updatedPost.body);
  });

  test('should delete a post', async ({ request }) => {
    const response = await request.delete('/posts/1');
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
  });

  test('should fetch posts by user id', async ({ request }) => {
    const response = await request.get('/posts?userId=1');
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    const posts = await response.json();
    expect(Array.isArray(posts)).toBeTruthy();
    expect(posts.length).toBeGreaterThan(0);
    posts.forEach((post) => {
      expect(post.userId).toBe(1);
    });
  });

  test('should return 404 for non-existent post', async ({ request }) => {
    const response = await request.get('/posts/999999');
    expect(response.status()).toBe(404);
  });
});

test.describe('Comments API Tests', () => {
  test('should fetch all comments', async ({ request }) => {
    const response = await request.get('/comments');
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    const comments = await response.json();
    expect(Array.isArray(comments)).toBeTruthy();
    expect(comments.length).toBeGreaterThan(0);
    expect(comments[0]).toHaveProperty('id');
    expect(comments[0]).toHaveProperty('name');
    expect(comments[0]).toHaveProperty('email');
    expect(comments[0]).toHaveProperty('body');
  });

  test('should fetch comments for a specific post', async ({ request }) => {
    const response = await request.get('/comments?postId=1');
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    const comments = await response.json();
    expect(Array.isArray(comments)).toBeTruthy();
    comments.forEach((comment) => {
      expect(comment.postId).toBe(1);
    });
  });
});

test.describe('Users API Tests', () => {
  test('should fetch all users', async ({ request }) => {
    const response = await request.get('/users');
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    const users = await response.json();
    expect(Array.isArray(users)).toBeTruthy();
    expect(users.length).toBeGreaterThan(0);
    expect(users[0]).toHaveProperty('id');
    expect(users[0]).toHaveProperty('name');
    expect(users[0]).toHaveProperty('email');
  });

  test('should fetch a single user by id', async ({ request }) => {
    const response = await request.get('/users/1');
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    const user = await response.json();
    expect(user.id).toBe(1);
    expect(user).toHaveProperty('name');
    expect(user).toHaveProperty('email');
  });

  test('should fetch user albums', async ({ request }) => {
    const response = await request.get('/users/1/albums');
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    const albums = await response.json();
    expect(Array.isArray(albums)).toBeTruthy();
    expect(albums.length).toBeGreaterThan(0);
  });
});