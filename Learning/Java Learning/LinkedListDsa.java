class Node {

    private String data;
    private Node next;

    public Node(String data) {
        this.data = data;
    }

    public void setData(String data) {
        this.data = data;
    }

    public void setNext(Node node) {
        this.next = node;
    }

    public String getData() {
        return this.data;
    }

    public Node getNext() {
        return this.next;
    }
}

class LinkedList {

    private Node head;
    private Node tail;

    public Node getHead() {
        return this.head;
    }

    public Node getTail() {
        return this.tail;
    }

    public void setHead(Node node) {
        this.head = node;
    }

    public void setTail(Node node) {
        this.tail = node;
    }

    public void addAtEnd(String data) {
        Node node = new Node(data);

        if (this.head == null) {
            this.head = this.tail = node;
        } else {
            this.tail.setNext(node);
            this.tail = node;
        }
    }

    public void addAtBeginning(String data) {
        Node node = new Node(data);

        if (this.head == null) {
            this.head = this.tail = node;
        } else {
            node.setNext(this.head);
            this.head = node;
        }
    }

    public void display() {
        Node temp = this.head;

        while (temp != null) {
            System.out.println(temp.getData());
            temp = temp.getNext();
        }
    }

    public Node find(String data) {
        Node temp = this.head;

        while (temp != null) {
            if (temp.getData().equals(data))
                return temp;
            temp = temp.getNext();
        }
        return null;
    }

    public void insert(String data, String dataBefore) {
        Node node = new Node(data);

        if (this.head == null) {
            this.head = this.tail = node;
        } else {
            Node nodeBefore = this.find(dataBefore);
            if (nodeBefore != null) {
                node.setNext(nodeBefore.getNext());
                nodeBefore.setNext(node);
                if (nodeBefore == this.tail)
                    this.tail = node;
            } else {
                System.out.println("Node not found");
            }
        }
    }

    public void delete(String data) {
        if (this.head == null) {
            System.out.println("List is empty");
            return;
        }

        Node node = this.find(data);

        if (node == null) {
            System.out.println("Node not found");
            return;
        }

        if (node == this.head) {
            this.head = this.head.getNext();
            node.setNext(null);
            if (node == this.tail)
                this.tail = null;
        } else {
            Node nodeBefore = null;
            Node temp = this.head;
            while (temp != null) {
                if (temp.getNext() == node) {
                    nodeBefore = temp;
                    break;
                }
                temp = temp.getNext();
            }

            nodeBefore.setNext(node.getNext());

            if (node == this.tail)
                this.tail = nodeBefore;
            node.setNext(null);
        }
    }

    public int findPosition(String element) {
        Node temp = this.head;
        int position = 1;
        while (temp != null) {
            if (temp.getData().equals(element)) {
                return position;
            }
            position++;
            temp = temp.getNext();
        }
        return -1; // Not found
    }

    public void shiftListLeft(int n) {
        if (this.head == null || n <= 0) return;

        int length = 0;
        Node temp = this.head;
        while (temp != null) {
            length++;
            temp = temp.getNext();
        }

        n = n % length;
        if (n == 0) return;

        Node newTail = this.head;
        for (int i = 1; i < n; i++) {
            newTail = newTail.getNext();
        }
        Node newHead = newTail.getNext();

        this.tail.setNext(this.head);
        newTail.setNext(null);

        this.head = newHead;
        this.tail = newTail;
    }

    public void shiftListRight(int n) {
        if (this.head == null || n <= 0) return;

        int length = 0;
        Node temp = this.head;
        while (temp != null) {
            length++;
            temp = temp.getNext();
        }

        n = n % length;
        if (n == 0) return;

        Node newTail = this.head;
        for (int i = 1; i < length - n; i++) {
            newTail = newTail.getNext();
        }
        Node newHead = newTail.getNext();

        this.tail.setNext(this.head);
        newTail.setNext(null);

        this.head = newHead;
        this.tail = newTail;
    }

    public void reverseList() {
        Node current = this.head;
        Node prev = null;
        this.tail = current;
        while (current != null) {
            Node nextNode = current.getNext();
            current.setNext(prev);
            prev = current;
            current = nextNode;
        }
        this.head = prev;
    }
}

class LinkedListDsa{
    public static void main(String args[]) {
        LinkedList linkedList = new LinkedList();

        linkedList.addAtEnd("Data");
        linkedList.addAtEnd("Structures");
        linkedList.addAtEnd("and");
        linkedList.addAtEnd("Algorithms");

        System.out.println("Initial List:");
        linkedList.display();

        // Find position of an element
        String elementToFind = "and";
        int position = linkedList.findPosition(elementToFind);
        System.out.println("\nPosition of '" + elementToFind + "' is: " + (position == -1 ? "Not Found" : position));

        // Left shift by 2 positions
        System.out.println("\nList after left shifting by 2 positions:");
        linkedList.shiftListLeft(2);
        linkedList.display();

        // Right shift by 2 positions
        System.out.println("\nList after right shifting by 2 positions:");
        linkedList.shiftListRight(2);
        linkedList.display();

        // Reverse the list
        System.out.println("\nReversed List:");
        linkedList.reverseList();
        linkedList.display();
    }
}
