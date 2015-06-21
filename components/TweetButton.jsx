
import React from 'react'
import tweetScript from '../src/tweet-script'

class TweetButton extends React.Component {

  render () {
    let script = {
      __html: tweetScript
    }
    let text = 'Mathematically-derived gradient explorer'
    return (
      <div className="inline-block">
        <a href="https://twitter.com/share"
          className="twitter-share-button"
          data-text={text}
          data-via="jxnblk"
          data-size="large">
          Tweet
        </a>
        <script dangerouslySetInnerHTML={script} />
      </div>
    )
  }

}

export default TweetButton

