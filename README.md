# Kinectron Viewer Babylon

https://user-images.githubusercontent.com/11372210/161946238-7b444ebf-2a20-4f70-bcba-09a065a6ee6c.mp4

## About

Babylon.js で実装した Kinectron ビューワークライアント。
Kinectron Server から受信した DepthMap を点群に変換して表示します。

## About Kinectron

[Kinectron](https://kinectron.github.io/#/)とは、Electron アプリによって Azure Kinect もしくは Kinect for Winddows
のデータを取得し、WebRTC 通信によって Web クライアントでそれを受信できるシステムです。

## Tested Environment

- Windows 10 Home
- Google Chrome
- Babylon.js 5.0.0-rc.11
- Kinectron 0.3.7
- Azure Kinect Sensor SDK 1.4.1

## Install

```shell
# install packages
yarn install

# launch dev server
yarn dev
```

## Usage

Azure Kinect が接続されている環境で、
Kinectron Server を起動します。
その状態で同じ PC から dev server を起動します。

## Contact

何かございましたら、[にー兄さんの Twitter](https://twitter.com/ninisan_drumath)
までご連絡ください。
