import threading
import time

"""
Файл для написания декораторов приложения
"""


def thread(func):
    """Декоратор для запуска функции в отдельном потоке"""
    def wrapper(*args, **kwargs):
        ch1 = threading.Thread(target=func, args=args, kwargs=kwargs)
        ch1.start()
    return wrapper


def pause(t=1):
    """Декоратор для постановки функции на задержку на t секунд"""
    def main_wrap(f):
        def tmp(*args, **kwargs):
            time.sleep(t)
            return f(*args, **kwargs)
        return tmp
    return main_wrap
