---
layout: post
title: Python import 测试
tags: [python]
---

成千上万的package和module是python最强大得威力，最近在使用python的import时有点晕，做了个小的test想弄清楚各种import的不同之处， 下面是我的一个小实验，看来python的基础只是不扎实呀-_-!

<!--more-->

#### 目录结构
<pre>
foo/
├── bar/
|   ├── __init__.py
|   └── main.py
├── case.py
├── case1.py
├── case2.py
├── case3.py
└── case4.py
</pre>

#### 测试代码

<script src="https://gist.github.com/likebeta/f2b38faef4b7fb1e9ae0.js"></script>

#### 运行结果

```
[mj@model_3 foo]$ python case.py
case.py
/home/work/foo/bar/__init__.py
{'bar': <module 'bar' from '/home/work/foo/bar/__init__.py'>, '__builtins__': <module '__builtin__' (built-in)>, '__file__': 'case.py', '__package__': None, '__name__': '__main__', '__doc__': None}
bar_init
```

```
[mj@model_3 foo]$ python case1.py
case1.py
/home/work/foo/bar/__init__.pyc
/home/work/foo/bar/main.py
{'bar': <module 'bar' from '/home/work/foo/bar/__init__.pyc'>, '__builtins__': <module '__builtin__' (built-in)>, '__file__': 'case1.py', '__package__': None, '__name__': '__main__', '__doc__': None}
bar_init
bar_main
```

```
[mj@model_3 foo]$ python case2.py
case2.py
/home/work/foo/bar/__init__.pyc
{'bar_init': <function bar_init at 0x7f88de5f35f0>, '__builtins__': <module '__builtin__' (built-in)>, '__file__': 'case2.py', '__package__': None, '__name__': '__main__', '__doc__': None}
bar_init
Traceback (most recent call last):
  File "case2.py", line 11, in <module>
    main.bar_main()
NameError: name 'main' is not defined
```

```
[mj@model_3 foo]$ python case3.py
case3.py
/home/work/foo/bar/__init__.pyc
/home/work/foo/bar/main.pyc
{'__builtins__': <module '__builtin__' (built-in)>, '__file__': 'case3.py', '__package__': None, '__name__': '__main__', 'main': <module 'bar.main' from '/home/work/foo/bar/main.pyc'>, '__doc__': None}
bar_main
Traceback (most recent call last):
  File "case3.py", line 11, in <module>
    bar_init()
NameError: name 'bar_init' is not defined
```

```
[mj@model_3 foo]$ python case4.py
case4.py
/home/work/foo/bar/__init__.pyc
/home/work/foo/bar/main.pyc
{'bar_main': <function bar_main at 0x7f336e6b2230>, '__builtins__': <module '__builtin__' (built-in)>, '__file__': 'case4.py', '__package__': None, '__name__': '__main__', '__doc__': None}
bar_main
Traceback (most recent call last):
  File "case4.py", line 11, in <module>
    bar_init()
NameError: name 'bar_init' is not defined
```

