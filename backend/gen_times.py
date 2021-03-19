import time
import random


def gen_times(frequency, seed=123):
    """
        Generates random timestamps between now and last month
    """
    random.seed(seed)
    curr_time = time.time()

    times = []
    for _ in range(0, frequency):
        rand_time = int(curr_time - random.randint(0, 4 * 7 * 24 * 60 * 60))
        times.append(rand_time)
    times.sort()

    for each_time in times:
        readable_time = time.ctime(each_time)
        print("{} ({})".format(readable_time, each_time))
