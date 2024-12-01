from get_data import get_data


def get_lists(data):
    list_one = []
    list_two = []
    for element in data:
        el_one, el_two = element.split("   ")
        list_one.append(el_one)
        list_two.append(el_two)
    return list_one, list_two


def count_distance(num1, num2):
    return abs(int(num1) - int(num2))


def get_distance_list(arr1, arr2):
    list_distance = []
    for i in range(len(arr1)):
        distance = count_distance(arr1[i], arr2[i])
        list_distance.append(distance)
    return list_distance


def get_similarity_list(arr1, arr2):
    list_distance = []
    for i in range(len(arr1)):
        occurrence_number = arr2.count(arr1[i])
        list_distance.append(occurrence_number * int(arr1[i]))
    return list_distance


def part1(input_data):
    list_one, list_two = get_lists(input_data)
    distance_list = get_distance_list(sorted(list_one), sorted(list_two))
    return sum(distance_list)


def part2(input_data):
    list_one, list_two = get_lists(input_data)
    return sum(get_similarity_list(list_one, list_two))


def main():
    task_data = get_data('../data/day1.txt')
    print(part1(task_data))
    print(part2(task_data))


if __name__ == '__main__':
    main()