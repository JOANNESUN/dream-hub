import React, { useEffect } from "react";
import "./UserProfile.css";
import * as am5 from "@amcharts/amcharts5";
import * as am5wc from "@amcharts/amcharts5/wc";
import { useSelector } from 'react-redux';

export default function UserProfile() {
  const userDreamData = useSelector((state) => state.dreamKeyWords.keywords);
  useEffect(() => {
    // Create root
    let root = am5.Root.new("wordcloud-container");

    var wc = root.container.children.push(am5wc.WordCloud.new(root, {
      excludeWords: ["the", "a", "an", "the", "you", "and", "to", "of", "with", "our", "in", "that", "your", "for", "this", "dream", "or"],
      colors: am5.ColorSet.new(root, {
        colors: [
          am5.color("#FF0000"), // Bright Red
          am5.color("#FFA500"), // Bright Orange
          am5.color("#FF0000"), // Bright Red (repeated)
          am5.color("#fcba03"), // Bright Orange (repeated)
          am5.color("#b103fc")  // Bright Orange (repeated)
        ]
      }),
      rotationThreshold: 0.7,
      maxCount: 100,
      minValue: 1,
      minWordLength: 2,
      minFontSize: am5.percent(4),
      maxFontSize: am5.percent(15),
      text: userDreamData
    }));

    wc.labels.template.setup = function(target) {
      var bg = target.set("background", am5.RoundedRectangle.new(root, {
        fill: am5.color(0x000000)
      }));
      
      bg.states.create("hover", {
        fill: am5.color(0xff621f)
      });
    }
    
   wc.labels.template.states.create("hover", {
      fill: am5.color(0xffffff)
    });

    return () => {
      // Clean up
      root.dispose();
    };
  }, [userDreamData]);

  return (
    <div className="user-container">
      <h2 className="label">Key words from your dream journal</h2>
      <div id="wordcloud-container" style={{ width: "100%", height: "13em" }}></div>
    </div>
  );
}
