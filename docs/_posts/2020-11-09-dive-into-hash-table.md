---
title: A Dive into Hash Table
category: walkthrough
tags:
 - data structure
 - python
date: 2020-11-10
vssue-title: A Dive into Hash Table
---



Demystifying the concepts of hash table

<!-- more -->

<TOC />

I remember studying data structures for the first time in my sophomore year, hash was one of the vaguest concept I learned. That's why I wanted to write about it as the first post on my blog, to pin down what it really is. In the process I hope it helps other people trying to understand the concept of it as well. Okay so here it goes. Today, we'll have a dive into hash tables. I intend to make this a series as I walk through "Cracking the Coding Interview".



##  What is Hash Table?

Hash tables serve the purpose of efficient look up for data(**often referred to as keys**). The two components of a hash table is a **hash function** and **array**. Hash function handles where in the array will the data be stored. So if hash table has an array, when would we want to use it over a simple array? First case is the data is not an indexable type. If you want to store some strings, then you can't simply use the string as an index. Second, you want to minimize memory usage. Say you want to store integers, which are literally index themselves. If you expect to your integers to range from 0 to infinitely big number, your computer will crash trying to allocate that big of an array in the memory.

### What is Hash Function Really?

This was the biggest problem I had learning hash for the first time. All the books and materials would talk about the time complexity and all, but what does it actually look like? While key can be of any type, string is a good example. Since this post is about demystifying the concepts, below is an example of a hash function.

```python
KEY_SPACE = 100

def my_hash(key: str) -> int:
    
    ascii_code_sum = 0
    for c in key:
        ascii_code_sum += ord(c)

    return ascii_code_sum % KEY_SPACE
```

It's a simple hash function based on ASCII code. One thing I think is overlooked by beginners is that **time complexity of hash function is not necessarily O(1)**. Granted once you hash the key you can access the data right away, but as you can see above the time complexity is actually O(S) where S is the length of the string. Note that the O(1) time complexity written in textbook is very roughly spoken. What makes a function hash function are as follows.

- It has to yield the same result for the same key always, i.e. you can't bring randomness into a hash function like rand() or time().
- It generates an address you use to access the data with.

### How does Array Work with Hash Function?

At first glance, it seems the array could just simply store the value because you created an address for your data with the key, so you just store them right there. However, our above example can show the problem with this intuitive approach. Say you're using a hash table using the above hash function, and you want to store two keys "abc" and "cba". Hash code for them will be the same because the hash function adds up the ASCII codes regardless of the order. Two different keys resulting in the same hash code like this is called **hash collision**, and it shows why you can't simply store values directly in the array.

```python
>>> # These two keys compete for the same hash slot!
>>> my_hash("abc")
94
>>> my_hash("cba")
94
```



## Resolving Hash Collision

Let's see what options there are to solve hash collision and their pros and cons. I implemented a hash table for each approach so you can take a look at a live example.

### Approach 1: Chaining

This is the most common approach to solving hash collision. The idea is when hash collision happens, you the colliding keys together in the same slot in array anyway. To do so, array stores containers called **buckets**. When you find the right bucket for given key, you are expected to traverse through the bucket looking for the value. **Buckets are typically implemented with a linked list**. Code below is an example.

```python
from typing import Callable

KEY_SPACE = 100

class HashTableChaining:
    def __init__(self, my_hash: Callable):
        self.hash = my_hash  # hash function
        self.array = [list()] * KEY_SPACE  # Array of linked lists

    # Store the given key in the table.
    def store(self, key: str) -> bool:
        hash_code = self.hash(key)
        for elt in self.array[hash_code]:
            if elt == key:
                return False
            
        self.array[hash_code].append(key)
        return True

    # Check if given key exists in the table.
    def lookup(self, key: str) -> bool:
        hash_code = self.hash(key)
        for elt in self.array[hash_code]:
            if elt == key:
                return True

        return False
```

```python
>>> hash_table = HashTableChaining(my_hash)
>>> hash_table.store("abc")
True
>>> hash_table.store("cba")
True
>>> hash_table.store("abc")
False
>>> hash_table.lookup("abc")
True
>>> hash_table.lookup("cba")
True
>>> hash_table.lookup("aaa")
False
```

- pros
  - You can store more keys than key space size. You can have key space of 100 and still store 200 keys in the table for example.
- cons
  - With many hash collisions due to bad hash function or imbalanced data, it will take much more time to look up a key in bucket.

### Approach 2: Open Addressing

This approach gives up on finding the exact hash slot, hence the name open addressing. Instead, **if a slot is already taken, you store the new key in another slot**. Way of choosing "another slot" is called **probing**. Here we use linear probing, which simply increments slot number until you find an empty one. Let's get back to the example of keys "abc" and "cba". When you first store "abc", it will take slot 94. Then when you store "cba", slot 94 is taken so it goes to 95. This ensures there's only one key stored in each slot, at the cost of losing the certainty of data's exact location.

```python
from typing import Callable
from itertools import chain

KEY_SPACE = 100

class HashTableOpenAddressing:
    def __init__(self, my_hash: Callable):
        self.hash = my_hash  # hash function
        self.array = [None] * KEY_SPACE  # Array of strings

    # Store the given key in the table.
    def store(self, key: str) -> bool:
        hash_code = self.hash(key)

        for slot in chain(range(hash_code, KEY_SPACE), range(hash_code)):
            if self.array[slot] is None:
                self.array[slot] = key
                return True
            elif self.array[slot] == key:
                break
            
        return False

    # Check if given key exists in the table.
    def lookup(self, key: str) -> bool:
        hash_code = self.hash(key)
        for slot in chain(range(hash_code, KEY_SPACE), range(hash_code)):
            if self.array[slot] == key:
                return True

        return False
```

```python
>>> hash_table = HashTableOpenAddressing(my_hash)
>>> hash_table.store("abc")
True
>>> hash_table.store("cba")
True
>>> hash_table.store("abc")
False
>>> hash_table.lookup("abc")
True
>>> hash_table.lookup("cba")
True
>>> hash_table.lookup("aaa")
False
```

- pros
  - Open addressing is more memory efficient than chaining since you recycle the slots that are left empty.
- cons
  - You cannot store more keys than your key space allows.
  - Becomes more and more inefficient with larger key space.



## Storing Key-Value Pairs with Hash Table

So far we have used hash tables to store keys only, but with few modifications you can use them to store key-value pairs. Let's take a look at chaining approach. It's as simple as storing key-value pairs instead of just keys.

```python
class HashTableChaining:
    def __init__(self, my_hash: Callable):
        self.hash = my_hash
        self.array = [list()] * KEY_SPACE

    # Store the given key-value pair in the table.
    def store(self, key: Key, value: Value) -> bool:
        hash_code = self.hash(key)
        for i, (skey, sval) in enumerate(self.array[hash_code]):
            if skey == key:
                self.array[hash_code][i] = (key, value)
                return False
            
        self.array[hash_code].append((key, value))
        return True

    # Get value by given key.
    def lookup(self, key: Key) -> Value:
        hash_code = self.hash(key)
        for skey, sval in self.array[hash_code]:
            if skey == key:
                return sval
```

```python
>>> hash_table = HashTableChaining(my_hash)
>>> hash_table.store("abc", 1)
True
>>> hash_table.store("cba", 2)
True
>>> hash_table.store("abc", 3)
False
>>> hash_table.lookup("abc")
3
>>> hash_table.lookup("cba")
2
>>> hash_table.lookup("aaa")
>>> 
```