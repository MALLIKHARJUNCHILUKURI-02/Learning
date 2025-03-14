import java.util.Scanner;

// Stack class to implement stack operations
class Stack {
    private int top;
    private int[] stack;
    private int maxSize;

    // Constructor to initialize stack
    Stack(int maxSize) {
        this.top = -1;
        this.maxSize = maxSize;
        this.stack = new int[maxSize];
    }

    // Check if the stack is full
    public boolean isFull() {
        return top >= maxSize - 1;
    }

    // Check if the stack is empty
    public boolean isEmpty() {
        return top < 0;
    }

    // Push element onto the stack
    public boolean push(int data) {
        if (isFull()) {
            System.out.println("Stack is full");
            return false;
        } else {
            stack[++top] = data;
            return true;
        }
    }

    // Pop element from the stack
    public int pop() {
        if (isEmpty()) {
            System.out.println("Stack is Empty");
            return Integer.MIN_VALUE;
        } else {
            return stack[top--];
        }
    }

    // Peek at the top element of the stack
    public int peek() {
        if (isEmpty()) {
            System.out.println("Stack is Empty");
            return Integer.MIN_VALUE;
        }
        return stack[top];
    }

    // Display all elements in the stack
    public void display() {
        if (isEmpty()) {
            System.out.println("Stack is Empty");
        } else {
            System.out.println("Elements in the Stack:");
            for (int i = top; i >= 0; i--) {
                System.out.println("[ top = " + i + " ]  -  " + stack[i]);
            }
        }
    }
}

// Main class to execute stack operations
public class StackDsa {
    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);

        // Initialize stack
        System.out.print("Enter the size of the stack: ");
        int size = input.nextInt();
        Stack stack = new Stack(size);

        // Push elements into the stack
        for (int i = 0; i < size; i++) {
            System.out.print("Enter the element [ " + (i + 1) + " ] to be pushed into the stack: ");
            int element = input.nextInt();
            stack.push(element);
        }

        // Display stack contents
        stack.display();

        // Push an additional element
        System.out.print("Push an additional element to the stack: ");
        stack.push(input.nextInt());

        // Peek at the top element
        System.out.println("Top Element: " + stack.peek());

        // Pop an element from the stack
        int popValue = stack.pop();
        if (popValue != Integer.MIN_VALUE) {
            System.out.println("Popped Value: " + popValue);
        }

        // Display stack contents after popping
        stack.display();
        input.close();
    }
}
