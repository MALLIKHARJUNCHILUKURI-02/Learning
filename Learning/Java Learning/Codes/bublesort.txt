class Tester {
	static int noOfSwaps = 0;
	static int noOfPasses = 0;

	public static void swap(int[] numbers, int firstIndex, int secondIndex) {
		int temp = numbers[firstIndex];
		numbers[firstIndex] = numbers[secondIndex];
		numbers[secondIndex] = temp;
		noOfSwaps += 1;
	}

	public static void bubbleSort(int[] numbers) {
		int length = numbers.length;

		for (int index1 = 0; index1 < (length - 1); index1++) {
			boolean swapped = false;
			noOfPasses += 1;
			for (int index2 = 0; index2 < (length - index1 - 1); index2++) {
				if (numbers[index2] > numbers[index2 + 1]) {
					swap(numbers, index2, index2 + 1);
					swapped = true;
				}
			}
			if (swapped == false)
				break;
		}
	}

	public static void main(String[] args) {

		int[] numbers = { 48, 40, 35, 49, 33 };
		System.out.println("Given array:");
		for (int number : numbers) {
			System.out.println(number);
		}
		
		bubbleSort(numbers);
		
		System.out.println("Sorted array:");
		for (int number : numbers) {
			System.out.println(number);
		}

		System.out.println("No. of passes: " + noOfPasses);
		System.out.println("No. of swaps: " + noOfSwaps);
	}
}
