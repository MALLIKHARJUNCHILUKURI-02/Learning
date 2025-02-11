import java.util.Scanner;

class Queue {
    private int front, rear, maxSize;
    private String queue[];

    Queue(int maxSize){
        this.maxSize = maxSize;
        this.queue = new String[this.maxSize];
        this.front=0;
        this.rear=-1;
    }
    
    public boolean isFull(){
        if(this.rear>=this.maxSize-1){
            return true;
        }
        return false;
    }

    public boolean isEmpty(){
        if(this.front>this.rear){
            return true;
        }
        return false;
    }

    public boolean enQueue(String data){
        if(isFull()){
            return false;
        }else{
            this.rear++;
            this.queue[this.rear] = data;
            return true;
        }
    }

    public void display(){
        if(this.rear==-1){
            System.out.println("Queue is empty");
        }else{
            for(int i=this.front;i<=this.rear;i++){
                System.out.print(this.queue[i] + " ");
            }
        }
    }

    public String deQueue(){
        if(isEmpty()){
            return null;
        }else{
            String temp = this.queue[this.front];
            queue[this.front]=null;
            front++;
            return temp;
        }
    }
}

public class QueueDsa {
    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);
        System.out.print("Enter the Size of the queue : ");
        int maxSize = input.nextInt();
        Queue queue = new Queue(maxSize);

        for(int i=0;i<maxSize;i++){
            System.out.print("Enter the Element [ "+(i+1)+" ] to be added to the Queue :");
            String data = input.next();
            if(queue.enQueue(data)){
                System.out.println(data+" is added to the Queue");
            }else{
                System.out.println("Queue is full");
            }
        }

        queue.display();

        String deQueueElement=queue.deQueue();
        System.out.println("Element "+deQueueElement+ " Is Deleted");

        System.out.println("After The deQueue Operation");

        queue.display();
        input.close();
    }
    
}