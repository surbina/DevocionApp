# DevocionApp

## Synopsis

DevocionApp is a simple **Android** app designed to share daily devotional within your church or community. You can register, read devotionals and create comments.

DevocionApp depends on another project called **devocion.ar**, be sure to [check it out](https://github.com/surbina/devocion.ar)!

## Technologies

DevocionApp is mainly built on top of three technologies:

1. [React-Native](https://facebook.github.io/react-native/)
2. [Redux](http://redux.js.org/)
3. [Firebase](https://firebase.google.com/)
4. [NativeBase](http://nativebase.io/)

## Installation

DevocionApp strongly depends on devocion.ar, meaning that you can use devocion.ar without DevocionApp but not the other way around. You can find instructions to install devocion.ar on its [github page](https://github.com/surbina/devocion.ar).

To install this project you need to install React-Native locally. You can find instructions on how to do that [here](https://facebook.github.io/react-native/docs/getting-started.html).

Once you have installed everything clone this repository and install dependencies

```
git clone https://github.com/surbina/DevocionApp.git
npm install
```

Then you'll need to update src/firebase_config.js with the values from the initialization code snippet you got while creating the Firebase project for devocion.ar.

At this point you are ready to either modify the application or deploy it.

To test the application run the following commands from your project folder

```
react-native start
react-native run-android
```

You can also deploy the app following [this instructions](https://facebook.github.io/react-native/docs/signed-apk-android.html).

Once everything is ready you should be able to access your app!

If you happen to run into any troubles while following any of this instruction feel free to reach me at sebita.urbina [at] gmail.com

## License

###The MIT License (MIT)
Copyright (c) 2016 Sebastian Urbina

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
