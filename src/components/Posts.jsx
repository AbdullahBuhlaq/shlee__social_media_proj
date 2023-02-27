import $ from "jquery";
import Post from "./Post";
import StoryCirclePhoto from "./StoryCirclePhoto";
import AddPostSection from "./AddPostSection";
import ReactionList from "./ReactionList";
import CommentList from "./CommentList";
import { useState } from "react";
import showLikeList from "../functions/showLikeList";
import showCommentList from "../functions/showCommentList";

function Posts(props) {
  const [likeList, setLikeList] = useState([]);
  const [commentList, setCommentList] = useState({ postId: "", friendIndex: 0, postIndex: 0, comments: [] });

  const requestOptions = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: "",
  };

  async function addLike(postId, friendIndex, postIndex) {
    let infoRequestOptions = {
      ...requestOptions,
      body: JSON.stringify({
        postId: postId,
        userId: props.userInformation._id,
      }),
    };
    let response = await fetch("/addLike", infoRequestOptions);
    let data = await response.json();
    if (data.result == "done") {
      props.posts[friendIndex].posts[props.posts[friendIndex].posts.length - 1 - postIndex].likes.push(props.userInformation._id);
      props.setPosts([...props.posts]);
    }
  }

  async function removeLike(postId, friendIndex, postIndex) {
    let infoRequestOptions = {
      ...requestOptions,
      body: JSON.stringify({
        postId: postId,
        userId: props.userInformation._id,
      }),
    };
    let response = await fetch("/removeLike", infoRequestOptions);
    let data = await response.json();
    if (data.result == "done") {
      let index = props.posts[friendIndex].posts[props.posts[friendIndex].posts.length - 1 - postIndex].likes.indexOf(props.userInformation._id);
      props.posts[friendIndex].posts[props.posts[friendIndex].posts.length - 1 - postIndex].likes.splice(index, 1);
      props.setPosts([...props.posts]);
    }
  }

  return (
    <div className="body vw-100 flex-grow-1 d-flex">
      {/* left side */}
      <div className="left-side">
        <div className="d-flex flex-column posts-container">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta quasi dolores totam quae, veritatis atque eveniet perspiciatis numquam illum. Magnam quod dicta, impedit tenetur quam debitis, eaque atque veniam error vero unde amet earum ipsum quas. Tempora reprehenderit eaque beatae placeat ea laudantium explicabo itaque ipsa qui at culpa atque mollitia voluptates sed, neque,
          repudiandae, consequuntur delectus quo quod nobis aliquam molestiae eveniet accusantium minima. Quos maxime praesentium velit iusto distinctio. Et quia repellendus alias eligendi provident maiores magni, soluta labore. Eveniet ut aliquam laudantium amet quo odio repellat distinctio temporibus ipsa, illum modi dicta quibusdam voluptate qui aspernatur ea eligendi dolore, non maxime? Maxime
          dolores eum optio laudantium, vel enim dignissimos fuga sapiente at consequuntur ipsa totam quod rem? Veritatis harum eaque pariatur incidunt aliquid numquam consectetur reprehenderit magnam magni! Ipsam laborum, placeat nesciunt molestias reiciendis ad et quasi asperiores rem? Asperiores commodi earum id debitis aspernatur quidem voluptatum in, atque dicta modi sapiente recusandae
          mollitia repellendus tempore esse dolorum, culpa laborum vitae nobis, animi ab explicabo? Ea quas possimus itaque reiciendis doloribus repellat? Ratione delectus voluptas reiciendis itaque maiores fugiat nisi dicta omnis nostrum quibusdam expedita corporis quas laboriosam eligendi qui quaerat nobis, blanditiis, totam id! Cum ratione, nihil voluptatem amet ab iusto quisquam aperiam? Ut
          beatae facere labore eveniet cupiditate provident illum dolorem vel ab sit eos quo cumque aliquid porro esse repellat accusantium doloremque dolor non nobis, nostrum exercitationem numquam hic. Id dicta deserunt obcaecati eveniet quidem accusamus. Fugiat incidunt veritatis nam architecto cumque accusantium assumenda ea odit facilis, sapiente ipsam reprehenderit, delectus pariatur ipsum
          similique beatae. Facere ratione quaerat, nobis, commodi exercitationem pariatur voluptas iste modi eos qui dolorem omnis beatae odit facilis laboriosam dolores expedita dolor dicta architecto labore fugiat. Perferendis sit, dolorem voluptatem eius, dolorum quibusdam sunt, ducimus minus id totam facere iure. Sed sunt repellendus sit minima assumenda hic dolores mollitia harum laborum
          quam. Maiores, eveniet suscipit in vitae maxime quod praesentium rerum, saepe aperiam quis eum corrupti hic eaque inventore? Molestias, dignissimos maiores at suscipit officia iure voluptatum hic magnam sint sed repudiandae ducimus tempore, laboriosam quas odit minima libero cumque. Amet illo quidem id, sed, doloribus alias vel explicabo mollitia debitis eos sapiente iusto tenetur. Magni
          et tempora aliquam, alias voluptas culpa deserunt facere, sunt explicabo illo nostrum voluptatum labore consectetur corrupti dicta aliquid laborum quod voluptatem, impedit magnam? Voluptatum tempore veritatis quibusdam voluptates at a temporibus tenetur voluptatem, est natus porro alias consequatur provident. Sapiente nesciunt facere excepturi illum voluptates, odit, ad corrupti, ullam
          officiis fuga ratione quod non nihil veritatis alias ducimus maiores debitis fugit. Tempore, adipisci. Fuga optio explicabo nostrum magni saepe, laboriosam nobis! Eum, similique iste! Vel, quidem rerum nesciunt maxime perspiciatis culpa? Nobis eveniet magni blanditiis impedit quasi perferendis quam! Id vel sequi porro aliquid natus sed, aspernatur totam facere facilis commodi est,
          dolorum architecto consectetur minus, autem itaque atque maxime eligendi debitis impedit possimus doloribus assumenda? Quas aliquam sapiente cumque quos natus aperiam illum dolorum. Debitis eum in dicta ipsum eius? Ex nostrum optio ipsam non unde quo nulla doloremque. Eveniet at exercitationem eum, ea magnam ex similique nobis maxime placeat? Sapiente quae facilis culpa quibusdam dolorem
          officia repellat placeat, corrupti nulla. Qui aspernatur ducimus quos quia accusantium corrupti iusto repellat sunt, ea nostrum voluptate facilis numquam at ab omnis quasi animi accusamus ratione beatae dolore nihil! Doloremque officiis ducimus praesentium, numquam enim fugit quisquam reprehenderit provident molestiae nisi tenetur tempore id nulla, commodi quos voluptates odit ratione
          dicta debitis accusantium consectetur nemo. Dolorum, dignissimos dolor laborum suscipit porro ab totam aperiam tempore voluptatem adipisci, qui nobis consequatur cumque amet. Aperiam officia cumque voluptatum placeat, facere tempora provident blanditiis molestiae illo odit quam quod adipisci consectetur laudantium itaque labore magnam minus quae suscipit voluptatibus sed ipsum velit
          similique maiores. Obcaecati voluptatibus quos excepturi, molestiae porro et repellat amet temporibus dolorum, voluptatem iusto sed est? Sunt adipisci sed dicta ut, iste explicabo dolores et exercitationem error deserunt autem cum atque quidem laboriosam officia, quis accusamus nihil numquam reiciendis modi? Reprehenderit cumque sapiente quod, rerum esse tempore perferendis aliquid
          mollitia ad nostrum recusandae consequatur ipsam non vel id necessitatibus obcaecati blanditiis sunt? Sit id fugit nemo beatae autem odio incidunt, assumenda, minus praesentium cumque voluptate tempore facilis? Qui aspernatur velit assumenda eius, dolore impedit vero ad, odio praesentium repudiandae cupiditate modi laborum vel soluta odit. Labore nobis debitis quas reiciendis quasi modi
          dicta a, doloremque, quisquam dignissimos voluptas cupiditate. Rem saepe, minus a officia recusandae magnam odio est voluptates, cum labore repudiandae. Id sapiente recusandae, nemo neque dignissimos distinctio quam pariatur incidunt ullam aut, perferendis repudiandae iste quis saepe provident veritatis odit, ratione molestias sint ipsam nobis dolorem. Architecto in atque recusandae
          autem ratione iure blanditiis provident. Voluptatem, voluptates soluta! Harum ea tempore odit tempora nobis quam at itaque, odio enim laborum dicta omnis quod nostrum, suscipit eius molestiae sapiente neque eligendi hic dolore voluptatum dolorem perferendis ipsam? Omnis rem similique vitae adipisci rerum nostrum corrupti error vel a explicabo deleniti, quasi totam distinctio
          necessitatibus voluptate sed nulla molestias iste neque ad corporis beatae hic! Dolore vitae quaerat debitis nihil voluptate consequuntur ipsa fugit, ullam eaque qui necessitatibus modi quos officia consectetur iste commodi quis laborum molestias veniam quibusdam officiis accusamus. Accusantium doloremque ab beatae dolorum exercitationem laborum perferendis tempora, iusto at eum numquam
          quaerat atque aspernatur consequuntur consequatur. Odit eos nobis praesentium cupiditate quam, accusamus voluptates illum accusantium incidunt odio. Sint quidem enim maiores? Asperiores eaque ad ipsam facilis culpa quas quisquam quis perferendis corporis alias nemo dolore iure sed obcaecati sequi inventore, excepturi aperiam impedit consequatur ex. Sapiente debitis quis quisquam ratione
          officia sint rem perferendis similique aliquam vel, non nobis quasi ullam laudantium quod corrupti corporis reprehenderit. Omnis ut maxime itaque, rem commodi ab repellendus. Veritatis at adipisci aliquam maiores, blanditiis obcaecati earum assumenda! Laudantium, nemo est? Amet vel qui laboriosam dicta omnis, ut totam inventore adipisci commodi deserunt quidem minima debitis consequatur
          recusandae, culpa, sunt esse aliquid doloremque atque beatae nam? Corrupti animi facilis consectetur aperiam voluptatibus deleniti! Maxime provident inventore ipsa.
        </div>
      </div>

      {/* middle side */}
      <div className="middle-side">
        <AddPostSection userInformation={props.userInformation} />
        <div className="d-flex flex-column align-items-center position-absolute top-0 start-50 translate-middle-x posts-container">
          <div className="stories-section d-flex justify-content-end align-items-center">
            <button
              className="btn-submit add-post"
              onClick={() => {
                $(".add-post-section").fadeIn();
              }}
            >
              Add Post +
            </button>
            <div className="stories-line d-flex">
              <StoryCirclePhoto userName={"Abdullah Buhlaq"} photo={"/profile.jpg"} />
              <StoryCirclePhoto userName={"Abdullah Buhlaq"} photo={"/profile.jpg"} />
              <StoryCirclePhoto userName={"Abdullah Buhlaq"} photo={"/profile.jpg"} />
              <StoryCirclePhoto userName={"Abdullah Buhlaq"} photo={"/profile.jpg"} />
              <StoryCirclePhoto userName={"Abdullah Buhlaq"} photo={"/profile.jpg"} />
              <StoryCirclePhoto userName={"Abdullah Buhlaq"} photo={"/profile.jpg"} />
              <StoryCirclePhoto userName={"Abdullah Buhlaq"} photo={"/profile.jpg"} />
              <StoryCirclePhoto userName={"Abdullah Buhlaq"} photo={"/profile.jpg"} />
              <StoryCirclePhoto userName={"Abdullah Buhlaq"} photo={"/profile.jpg"} />
              <StoryCirclePhoto userName={"Abdullah Buhlaq"} photo={"/profile.jpg"} />
              <StoryCirclePhoto userName={"Abdullah Buhlaq"} photo={"/profile.jpg"} />
              <StoryCirclePhoto userName={"Abdullah Buhlaq"} photo={"/profile.jpg"} />
              <StoryCirclePhoto userName={"Abdullah Buhlaq"} photo={"/profile.jpg"} />
              <StoryCirclePhoto userName={"Abdullah Buhlaq"} photo={"/profile.jpg"} />
              <StoryCirclePhoto userName={"Abdullah Buhlaq"} photo={"/profile.jpg"} />
              <StoryCirclePhoto userName={"Abdullah Buhlaq"} photo={"/profile.jpg"} />
            </div>
          </div>
          {props.loadingPosts ? (
            <span>loading</span>
          ) : (
            props.posts &&
            props.posts.map((friend, friendIndex) => {
              return friend.posts
                .slice(0)
                .reverse()
                .map((item, index) => {
                  return <Post userInformation={props.userInformation} friendIndex={friendIndex} postIndex={index} postId={item._id} key={index} addLike={addLike} removeLike={removeLike} showLikeList={showLikeList} showCommentList={showCommentList} post={item} friend={friend} setLikeList={setLikeList} setCommentList={setCommentList} />;
                });
            })
          )}
        </div>
        <ReactionList userInformation={props.userInformation} duringEditFriend={props.duringEditFriend} addFriend={props.addFriend} removeFriend={props.removeFriend} likeList={likeList} setLikeList={setLikeList} />
        <CommentList setPosts={props.setPosts} posts={props.posts} userInformation={props.userInformation} commentList={commentList} setCommentList={setCommentList} />
      </div>

      {/* right side */}
      <div className="right-side"></div>
    </div>
  );
}

export default Posts;
