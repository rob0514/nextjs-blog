//import fs from 'fs';
//import matter from 'gray-matter';
//import { remark } from 'remark';
//import html from 'remark-html';




export async function getSortedPostsData() {
    let itemData = []
    // Get file names under /posts
    // const fileNames = fs.readdirSync(postsDirectory);
    const res = await fetch("https://dummyjson.com/posts?limit=5");
    const postData = await res.json();
    const data = postData.posts;
    data.map((post) => {
        itemData.push({
            id: post.id,
            title: post.title,
            body: post.body,
        })
    });
    console.log(itemData);
    // Sort posts by date
    return itemData.sort(({ id: a }, { id: b }) => {
        if (a < b) {
            return 1;
        } else if (a > b) {
            return -1;
        } else {
            return 0;
        }
    });
}


export async function getAllPostIds() {
    const res = await fetch("https://dummyjson.com/posts?limit=5");
    const postData = await res.json();
    const data = postData.posts;
    return data.map(post => {
        return {
            params: {
                id: JSON.stringify(post.id),
            },
        };
    });

//     const fileNames = fs.readdirSync(postsDirectory);
//
// //     // Returns an array that looks like this:
// //     // [
// //     //   {
// //     //     params: {
// //     //       id: 'ssg-ssr'
// //     //     }
// //     //   },
// //     //   {
// //     //     params: {
// //     //       id: 'pre-rendering'
// //     //     }
// //     //   }
// //     // ]
//     return fileNames.map((fileName) => {
//         return {
//             params: {
//                 id: fileName.replace(/\.md$/, ''),
//             },
//         };
//     });
}

export async function getPostData(id) {
    const res = await fetch(`https://dummyjson.com/posts/${id}`);
    const postData = await res.json();

    return {
        id: postData.id,
        title: postData.title,
        body: postData.body,
    };
}
