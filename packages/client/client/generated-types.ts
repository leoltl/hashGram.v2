import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type CommentPostInteraction = {
  __typename?: 'CommentPostInteraction';
  body?: Maybe<Scalars['String']>;
  commenter?: Maybe<User>;
  id?: Maybe<Scalars['String']>;
  timestamp?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['String']>;
};

export type CommentPostResult = {
  __typename?: 'CommentPostResult';
  comments?: Maybe<Array<Maybe<CommentPostInteraction>>>;
  message?: Maybe<Scalars['String']>;
};

export type FollowUserResult = {
  __typename?: 'FollowUserResult';
  following?: Maybe<Scalars['Boolean']>;
  message?: Maybe<Scalars['String']>;
};

export type LikePostInteraction = {
  __typename?: 'LikePostInteraction';
  liker?: Maybe<User>;
  timestamp?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['String']>;
};

export type LikePostResult = {
  __typename?: 'LikePostResult';
  likes?: Maybe<Scalars['Int']>;
  message?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  commentPost: CommentPostResult;
  followUser: FollowUserResult;
  likePost: LikePostResult;
  postCreate: PostCreateResult;
  signIn: SignInResult;
  signUp: User;
};


export type MutationCommentPostArgs = {
  body: Scalars['String'];
  postId: Scalars['String'];
};


export type MutationFollowUserArgs = {
  userToFollow: Scalars['String'];
};


export type MutationLikePostArgs = {
  postId: Scalars['String'];
};


export type MutationPostCreateArgs = {
  input: PostCreateInput;
};


export type MutationSignInArgs = {
  input: SignInInput;
};


export type MutationSignUpArgs = {
  input: SignUpInput;
};

export type Post = {
  __typename?: 'Post';
  createdAt?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  imageUrl?: Maybe<Scalars['String']>;
  owner?: Maybe<User>;
  ownerId: Scalars['ID'];
  postInteraction?: Maybe<PostInteraction>;
};

export type PostCreateInput = {
  imageUrl: Scalars['String'];
};

export type PostCreateResult = {
  __typename?: 'PostCreateResult';
  message?: Maybe<Scalars['String']>;
  post?: Maybe<Post>;
};

export type PostInteraction = {
  __typename?: 'PostInteraction';
  comments?: Maybe<Array<CommentPostInteraction>>;
  commentsCount?: Maybe<Scalars['Int']>;
  createdAt?: Maybe<Scalars['String']>;
  likes?: Maybe<Array<Maybe<LikePostInteraction>>>;
  likesCount?: Maybe<Scalars['Int']>;
  postId: Scalars['String'];
  updatedAt?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  interactionByPostId?: Maybe<PostInteraction>;
  postById?: Maybe<Post>;
  postByUser?: Maybe<Array<Maybe<Post>>>;
  postFeed?: Maybe<Array<Maybe<Post>>>;
  postUploadSignedUrl: Scalars['String'];
  userById?: Maybe<User>;
};


export type QueryInteractionByPostIdArgs = {
  postId: Scalars['String'];
};


export type QueryPostByIdArgs = {
  id: Scalars['String'];
};


export type QueryPostByUserArgs = {
  userId: Scalars['String'];
};


export type QueryUserByIdArgs = {
  id: Scalars['String'];
};

export type SignInInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type SignInResult = {
  __typename?: 'SignInResult';
  message?: Maybe<Scalars['String']>;
  token?: Maybe<Scalars['String']>;
};

export type SignUpInput = {
  email: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['String'];
  passwordConfirm: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  email: Scalars['String'];
  followers?: Maybe<Array<Maybe<User>>>;
  following?: Maybe<Array<Maybe<User>>>;
  id: Scalars['ID'];
  name: Scalars['String'];
  posts?: Maybe<Array<Maybe<Post>>>;
};

export type Get_AllQueryVariables = Exact<{ [key: string]: never; }>;


export type Get_AllQuery = { __typename?: 'Query', postFeed?: Array<{ __typename?: 'Post', id: string, imageUrl?: string | null | undefined, createdAt?: string | null | undefined, owner?: { __typename?: 'User', id: string, name: string } | null | undefined, postInteraction?: { __typename?: 'PostInteraction', likesCount?: number | null | undefined, comments?: Array<{ __typename?: 'CommentPostInteraction', body?: string | null | undefined, timestamp?: string | null | undefined, commenter?: { __typename?: 'User', id: string, name: string } | null | undefined }> | null | undefined } | null | undefined } | null | undefined> | null | undefined };


export const Get_AllDocument = gql`
    query GET_ALL {
  postFeed {
    id
    imageUrl
    owner {
      id
      name
    }
    postInteraction {
      comments {
        commenter {
          id
          name
        }
        body
        timestamp
      }
      likesCount
    }
    createdAt
  }
}
    `;

/**
 * __useGet_AllQuery__
 *
 * To run a query within a React component, call `useGet_AllQuery` and pass it any options that fit your needs.
 * When your component renders, `useGet_AllQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGet_AllQuery({
 *   variables: {
 *   },
 * });
 */
export function useGet_AllQuery(baseOptions?: Apollo.QueryHookOptions<Get_AllQuery, Get_AllQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Get_AllQuery, Get_AllQueryVariables>(Get_AllDocument, options);
      }
export function useGet_AllLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Get_AllQuery, Get_AllQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Get_AllQuery, Get_AllQueryVariables>(Get_AllDocument, options);
        }
export type Get_AllQueryHookResult = ReturnType<typeof useGet_AllQuery>;
export type Get_AllLazyQueryHookResult = ReturnType<typeof useGet_AllLazyQuery>;
export type Get_AllQueryResult = Apollo.QueryResult<Get_AllQuery, Get_AllQueryVariables>;