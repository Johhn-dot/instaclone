import React, {useCallback, useEffect, useState} from 'react';
import {FlatList} from 'react-native';

import {LazyImage} from '../../components/LazyImage';

import {Post, Header, Avatar, Name, Description, Loading} from './styles';

export const Feed = () => {
  const [feed, setFeed] = useState<any>();
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    (async () => {
      const response = await fetch(
        'http://localhost:3000/feed?_expand=author&_limit=5&_page=1',
      );
      const data = await response.json();

      setFeed(data);
      setPage((oldState) => oldState + 1);
    })();
  }, []);

  const loadPage = useCallback(
    async (pageNumber: number = page, shouldRefresh: boolean = false) => {
      if (total && pageNumber > total) {
        return;
      }

      const response = await fetch(
        `http://localhost:3000/feed?_expand=author&_limit=5&_page=${pageNumber}`,
      );
      const data = await response.json();
      const totalItems: number = Number(response.headers.get('X-Total-Count'));

      setTotal(Math.floor(totalItems / 5));
      setFeed((oldFeed: any) => (shouldRefresh ? data : [...oldFeed, ...data]));
      setPage((oldState) => oldState + 1);
    },
    [page, total],
  );

  const handleRefreshList = useCallback(async () => {
    setRefreshing(true);

    await loadPage(1, true);

    setRefreshing(false);
  }, [loadPage]);

  return (
    <FlatList
      data={feed}
      keyExtractor={(post) => String(post.id)}
      onEndReached={() => loadPage()}
      onEndReachedThreshold={0.1}
      onRefresh={handleRefreshList}
      refreshing={refreshing}
      ListFooterComponent={<Loading />}
      renderItem={({item: post}) => (
        <Post>
          <Header>
            <Avatar source={{uri: post.author.avatar}} />
            <Name>{post.author.name}</Name>
          </Header>

          <LazyImage
            aspectRatio={post.aspectRatio}
            source={post.image}
            smallSource={post.small}
          />

          <Description>
            <Name>{post.author.name}</Name> {post.description}
          </Description>
        </Post>
      )}
    />
  );
};
