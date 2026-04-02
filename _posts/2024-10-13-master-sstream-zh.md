---
layout: post
lang: zh
language: zh-CN
translation_url: /2024-10-13-master-sstream/
permalink: /zh/2024-10-13-master-sstream/
title: 彻底掌握 C++ 中的 `std::stringstream`
subtitle: 学会用 `std::stringstream` 更轻松地完成字符串解析与格式化
tags: [Trivial Tech Knowledge, Coding Exercises]
readtime: true
---

最近我遇到了一个小而经典的问题：在 C++ 里解析并处理形如 *"yyyy/mm/dd"* 的字符串输入。完整解法可以看[这里](https://github.com/CQULeaf/MultiPlatform_Coding_Exercises/blob/main/Pat/%E4%B8%93%E4%B8%9A%E5%9F%BA%E6%9C%AC%E8%83%BD%E5%8A%9B%E6%B5%8B%E8%AF%95/7-5%20%E8%AE%A1%E7%AE%97%E5%A4%A9%E6%95%B0.cpp)。为了优雅地解决这个问题，我使用了属于 `<sstream>` 库的 `std::stringstream`。虽然我很早以前就用过这个工具，但这次还是想写一篇小总结，把它真正梳理清楚。

## 什么是 `std::stringstream`？

`std::stringstream` 是 C++ 标准库 I/O 体系的一部分。它允许我们像使用 `cin` 和 `cout` 一样去操作字符串。你可以用它来：

- **从字符串中提取数据**
- **格式化字符串**
- **在不同类型之间进行转换**

可以把它理解成：它把一个普通字符串包装成了“可输入可输出的流”，因此在处理格式化文本时非常方便。

## 基本语法

要使用 `std::stringstream`，首先需要包含 `<sstream>`：

```cpp
#include <sstream>
```

通常会按下面的步骤来使用它：

1. 创建一个 `std::stringstream` 对象；
2. 把字符串装入流中；
3. 从流中读取值，或者向流中写入值。

## 使用示例：解析日期

这里我还是用前面提到的那道 C++ 题目作为例子。

```cpp
#include <iostream>
#include <sstream>
#include <vector>

using namespace std;

bool isLeapYear(int year) {
    return (year % 4 == 0 && year % 100 != 0) || (year % 400 == 0);
}

int main() {
    string input;
    getline(cin, input);

    int year, month, day;
    char delimiter;
    stringstream ss(input);
    ss >> year >> delimiter >> month >> delimiter >> day;

    vector<int> daysInMonth = { 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 };
    if (isLeapYear(year)) {
        daysInMonth[1] = 29;
    }

    int dayOfYear = 0;
    for (int i = 0; i < month - 1; ++i) {
        dayOfYear += daysInMonth[i];
    }
    dayOfYear += day;

    cout << dayOfYear << endl;

    system("pause");
    return 0;
}
```

### 代码解释

1. 首先要包含必要头文件 `#include <sstream>`。
2. `getline(cin, input)` 用来读取用户输入的完整日期字符串。
3. `stringstream ss(input)` 用输入字符串初始化流对象。
4. `ss >> year >> delimiter >> month >> delimiter >> day` 按顺序把年份、月份和日期提取出来；中间的 `delimiter` 会接住 `'/'`，相当于把分隔符跳过去。

### 使用它的好处

- **处理分隔符很方便**：在提取值时，`std::stringstream` 能自然跳过空格或配合变量处理指定分隔符。
- **类型转换简单**：比如可以很轻松地把 `string` 形式的数字转换成 `int`。
- **错误处理更自然**：如果输入格式不正确，`std::stringstream` 会通过流状态位体现错误，比手写解析逻辑更稳妥。

## 总结

对于任何需要处理“带格式字符串”的 C++ 程序员来说，`std::stringstream` 都是一个非常值得熟练掌握的工具。无论是解析用户输入、进行类型转换，还是输出格式化字符串，它都能让这些操作变得更直观、更简洁。
