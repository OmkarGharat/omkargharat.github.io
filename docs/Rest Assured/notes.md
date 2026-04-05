### 💻 Java Fundamentals: Thread & JVM (English Notes)

To understand Parallel Execution, you first need to understand these three pillars:

**1. What is a Thread?**
Imagine a worker in a factory. A **Thread** is like a single worker performing a specific task.

- **Single-threading**: Only one worker doing one job at a time.
- **Multi-threading (Threading)**: Multiple workers (threads) working at the same time to finish tasks faster.

**2. What is JVM (Java Virtual Machine)?**
Think of **JVM** as the "Factory Building" where all your workers (threads) live and work. It manages the memory and resources required to run your Java program.

**3. JVM Memory Model (The Storage Room)**
JVM has different areas to store data:

- **Stack**: This is like a worker's "Private Notebook." Each thread has its own Stack. Data here is private and not shared.

- **Heap**: This is like a "Common Table" in the factory. All threads can see and access the data kept here.

**4. Static Variables Behavior**
**Static variables** are stored in a special area within the Heap.

- Since they are on the "Common Table," **all threads share the same static variable**.

- **The Risk**: If Thread A changes a static variable, Thread B will immediately see that change. In **Parallel Execution**, this can cause "Data Race" or "Inconsistency" if not handled carefully.

---

### 💻 Java Concurrency: Thread-Safety (English Notes)

In Parallel Execution, multiple threads access the same data simultaneously. **Thread-safety** is the property of an object or a piece of code that guarantees correct behavior when accessed by multiple threads at the same time.

**1. The Problem: Race Condition**
A **Race Condition** occurs when two or more threads try to modify a shared variable (like a static variable) at the exact same time.

- **Example**: If Thread A and Thread B both try to increment a shared counter `count++` simultaneously, the final value might be incorrect because they both read the same initial value.

**2. How to Achieve Thread-Safety?**
To protect your data during Parallel Execution, you can use the following techniques:

- **Synchronization**: Using the `synchronized` keyword ensures that only one thread can execute a block of code or a method at a time. It acts like a "Lock" on the factory door.
- **Atomic Variables**: Use classes from `java.util.concurrent.atomic` (like `AtomicInteger`). These perform operations in a single, uninterruptible step, preventing data inconsistency.
- **ThreadLocal**: This provides each thread with its own independent copy of a variable. Since the data is not shared, it is inherently thread-safe.
- **Immutable Objects**: Once created, these objects cannot be changed (e.g., `String`). Since they are "Read-Only," multiple threads can access them safely without any locks.

**3. Why it Matters in Automation?**
In Rest Assured or Selenium, if you use a **static** WebDriver or a static RequestSpecBuilder during parallel execution without thread-safety, your tests will crash or report wrong results.

---

### 💻 The Logic of Data Loss (English Notes)

You said: _"If both read 5 and both use count++, then both will be 6. No data loss, right?"_

**The Reality Check:**
If two different threads perform an increment, the final value **should be 7** ($5 + 1 + 1$).

- If the final result is **6**, it means one increment was completely ignored or overwritten.
- That "missing 1" is your **Data Loss**.

#### 🏦 Real-World Example: The ATM Withdrawal

Imagine you and your wife have a joint bank account with **₹5,000**.

1. **Thread A (You)**: You try to withdraw ₹1,000 at an ATM. The system reads your balance: **₹5,000**.
2. **Thread B (Me)**: At the exact same split second, I swipe the card for a ₹1,000 purchase. The system also reads the balance: **₹5,000**.
3. **Thread A**: Calculates $5000 - 1000 = 4000$ and updates the database to **₹4,000**.
4. **Thread B**: Also calculates $5000 - 1000 = 4000$ and updates the database to **₹4,000**.

**The Disaster:**
We both spent ₹1,000 (Total ₹2,000), but the bank balance only reduced by ₹1,000! While this sounds good for us, for the bank, it's a massive **Data Corruption** and financial loss. In a reverse scenario (like two deposits), **you** would be the one losing money.

---

