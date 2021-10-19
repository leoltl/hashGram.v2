import React from "react";
import { PostSingle } from "../components";

const mockPost = {
  postId: "abc123",
  posterId: "user123",
  posterName: "alice",
  postImageUrl: "https://hashgram.s3.amazonaws.com/user-content/e919d2cad572258e554cf21bebcc739b",
  likesCount: 0,
  comments: [
    {
      userId: "user234",
      userName: "bob",
      body: "That day when we got spotted by these lads",
      timestamp: new Date("2021-10-17")
    },
    {
      userId: "user234",
      userName: "catherine",
      body: "Wow 🙌❤️",
      timestamp: new Date("2021-10-18")
    },
    {
      userId: "user2345",
      userName: "leo",
      body: `Weeeeeeeeee.🌬
      .
      .
      .
      .
      #Northeasterly
      Blue sky gives me good mood.
      📍 (22.4606113, 114.2350456)
      #hkg#hkig#hongkong#hongkonger#hkboy#monsoon#wind#windsurfing#outdoor#water#watersport#autumn#summer#blue#bluesky#splash#board#excitement#taimeiduk#taipo#gopro#goprohero9#hero9#東北風#秋風#滑浪風帆#大美督`,
      timestamp: new Date("2021-10-18")
    }
  ],
  timestamp: new Date("2021-10-17"),
}

const Feed: React.FC = () => {
  return (
    <div>
      <PostSingle {...mockPost}/>
    </div>
  )
};

export default Feed;