import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import {
  Crown,
  Lock,
  Heart
} from "lucide-react";

export default function Creator() {

  const { username } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isPremium, setIsPremium] = useState(false);

  useEffect(() => {

    const fetchData = async () => {

      try {

        const creatorRes = await axios.get(
          `https://bookwebsite-4q2b.onrender.com/creator/${username}`
        );

        console.log("CREATOR:", creatorRes.data);

        setData(creatorRes.data);

        try {

          const meRes = await axios.get(
            "https://bookwebsite-4q2b.onrender.com/me",
            { withCredentials: true }
          );

          setIsPremium(meRes.data.user.isPremium);

        } catch (err) {
          console.log(err);
        }

      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }

    };

    fetchData();

  }, [username]);


  if (loading) {
    return (
      <div className="
        min-h-screen
        bg-[#07010f]
        flex items-center justify-center
        text-white
      ">
        <div className="text-center">

          <div className="
            w-14 h-14
            border-4 border-fuchsia-500/30
            border-t-fuchsia-500
            rounded-full
            animate-spin
            mx-auto
          " />

          <p className="mt-5 text-gray-400">
            Loading creator...
          </p>

        </div>
      </div>
    );
  }


  if (!data) {
    return (
      <div className="
        min-h-screen
        bg-[#07010f]
        flex items-center justify-center
        text-white
      ">
        Creator not found
      </div>
    );
  }


  return (
    <div className="
      min-h-screen
      bg-[#07010f]
      text-white
      px-4 md:px-10
      py-8
      relative
      overflow-hidden
    ">

      {/* BACKGROUND GLOW */}
      <div className="fixed inset-0 -z-10 overflow-hidden">

        <div className="
          absolute top-0 left-1/2 -translate-x-1/2
          w-175 h-175
          bg-fuchsia-600/20
          blur-[140px]
          rounded-full
        " />

        <div className="
          absolute bottom-0 right-0
          w-125 h-125
          bg-violet-600/20
          blur-[120px]
          rounded-full
        " />

      </div>


      {/* PROFILE SECTION */}
      <div className="
        relative overflow-hidden
        rounded-4xl
        border border-white/10
        bg-white/5
        backdrop-blur-2xl
        p-6 md:p-10
        mb-12
      ">

        {/* GLOW */}
        <div className="
          absolute top-0 right-0
          w-72 h-72
          bg-fuchsia-600/20
          blur-[120px]
          rounded-full
        " />

        <div className="
          relative z-10
          flex flex-col lg:flex-row
          lg:items-center
          lg:justify-between
          gap-8
        ">

          {/* LEFT */}
          <div className="
            flex flex-col sm:flex-row
            sm:items-center
            gap-5
          ">

            {/* AVATAR */}
           <div className="
  w-24 h-24 md:w-28 md:h-28
  rounded-full
  overflow-hidden
  border-2 border-white/10
  bg-[#1a1225]
  flex items-center justify-center
  shrink-0
">

  {data?.avatar ? (

    <img
      src={data.avatar}
      alt=""
      className="
        w-full h-full
        object-cover
      "
    />

  ) : (

    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="
        w-14 h-14
        text-gray-500
      "
    >
      <path
        fillRule="evenodd"
        d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
        clipRule="evenodd"
      />
    </svg>

  )}

</div>
            {/* INFO */}
            <div>

              <div className="
                flex items-center gap-3
                flex-wrap
              ">

                <h1 className="
                  text-3xl md:text-5xl
                  font-black
                  tracking-tight
                ">
                  @{data?.creator}
                </h1>

                <div className="
                  px-3 py-1
                  rounded-full
                  bg-linear-to-r
                  from-yellow-400
                  to-orange-400
                  text-black
                  text-xs
                  font-bold
                ">
                  CREATOR
                </div>

              </div>

              <p className="
                text-gray-400
                mt-4
                max-w-2xl
                text-sm md:text-base
                leading-relaxed
              ">
                Writing immersive fantasy and emotional stories on StarLit.
              </p>

             <div className="
                       mt-5 inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-white/5 border border-white/10 text-sm text-gray-300
  backdrop-blur-xl
">

  <Crown
    size={16}
    className="text-yellow-400"
  />

  <span>
    Premium Story Creator
  </span>

</div>

            </div>

          </div>


          {/* STATS */}
          <div className="
            grid grid-cols-2
            gap-4 md:gap-6
          ">

            <div className="
              rounded-2xl
              bg-black/30
              border border-white/10
              px-6 py-5
              min-w-32.5
              backdrop-blur-xl
            ">
              <p className="
                text-3xl
                font-black
              ">
                {data?.totalBooks || 0}
              </p>

              <p className="
                text-xs
                text-gray-400
                mt-1
              ">
                Stories
              </p>
            </div>

            <div className="
              rounded-2xl
              bg-black/30
              border border-white/10
              px-6 py-5
              min-w-32.5
              backdrop-blur-xl
            ">
              <p className="
                text-3xl
                font-black
              ">
                {data?.totalLikes || 0}
              </p>

              <p className="
                text-xs
                text-gray-400
                mt-1
              ">
                Likes
              </p>
            </div>

          </div>

        </div>

      </div>


      {/* STORIES HEADER */}
      <div className="
        flex items-center justify-between
        mb-6
      ">

        <div>
          <h2 className="
            text-3xl
            font-black
          ">
            Stories
          </h2>

          <p className="
            text-gray-400
            mt-1
            text-sm
          ">
            Explore all stories from this creator.
          </p>
        </div>

      </div>


      {/* STORY GRID */}
      <div className="
        grid
        grid-cols-2
        md:grid-cols-3
        lg:grid-cols-5
        gap-5
      ">

        {data?.books?.length > 0 ? (

          data.books.map((book) => (

            <div
              key={book._id}
              onClick={() => {

                if (book.isPremium && !isPremium) return;

                navigate(`/bookd/${book._id}`);
              }}
              className="
                cursor-pointer
                group
                hover:-translate-y-2
                transition-all
                duration-300
              "
            >

              {/* COVER */}
              <div className="
                relative
                aspect-2/3
                rounded-3xl
                overflow-hidden
                bg-white/5
                border border-white/10
                hover:border-fuchsia-500/40
                transition-all
                shadow-xl
              ">

                <img
                  src={book.cover}
                  alt={book.title}
                  className={`
                    w-full h-full
                    object-cover
                    transition-all
                    duration-500
                    ${
                      book.isPremium && !isPremium
                        ? "blur-sm brightness-50"
                        : "group-hover:scale-110"
                    }
                  `}
                />

                <div className="
                  absolute inset-0
                  bg-linear-to-t
                  from-black
                  via-black/10
                  to-transparent
                " />

                {book.isPremium && !isPremium && (
                  <div className="
                    absolute inset-0
                    bg-black/40
                    flex flex-col
                    items-center justify-center
                    backdrop-blur-[2px]
                  ">

                   <Lock
                size={30}
                  className="mb-2 text-white"
                        />

                    <p className="
                      text-xs
                      font-medium
                      tracking-wide
                    ">
                      PREMIUM STORY
                    </p>

                  </div>
                )}

                {book.isPremium && (
                  <div className="
                    absolute top-3 right-3
                    bg-linear-to-r
                    from-yellow-400
                    to-orange-400
                    text-black
                    text-[10px]
                    font-black
                    px-3 py-1
                    rounded-full
                    shadow-lg
                  ">
                    PREMIUM
                  </div>
                )}

              </div>

              {/* TEXT */}
              <div className="mt-4 px-1">

                <h3 className="
                  text-sm md:text-base
                  font-semibold
                  line-clamp-2
                  group-hover:text-fuchsia-300
                  transition-colors
                ">
                  {book.title}
                </h3>

                <p className="
                  text-xs
                  text-gray-400
                  mt-2
                  line-clamp-2
                  leading-relaxed
                ">
                  {book.description}
                </p>

                <div className="
                  flex items-center justify-between
                  mt-3
                  text-xs
                  text-gray-500
                ">

                  <span className="
                    px-2 py-1
                    rounded-full
                    bg-white/5
                    border border-white/10
                  ">
                    {book.category}
                  </span>

                  <div className="
                   flex items-center gap-1">
                        <Heart
                         size={12}
                        className="text-red-400 fill-red-400"
                               />

                             <span>
                        {book.ratings?.length || 0}
                                 </span>
                   </div>

                </div>

              </div>

            </div>

          ))

        ) : (

          <div className="text-gray-400">
            No stories found.
          </div>

        )}

      </div>

    </div>
  );
}