import React from "react";
import { Heading, Paragraph, Image, Box, Button } from "grommet";
import styled from "styled-components";

import { ExternalLink } from "../Links";
import { MEDIUM_URL, MEDIUM_CDN } from "../../helpers";
import Column, { Spacer } from "../Column";
import Grid from "../Grid";

const ImageWrapper = styled.div`
  position: relative;
  display: inline-block;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    pointer-events: none;
    box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.1);
  }
`;

const LinkedMediumImage = ({ imageId, slug }) => (
  <ExternalLink href={`${MEDIUM_URL}${slug}`}>
    <ImageWrapper>
      <Image
        style={{ maxWidth: "100%", verticalAlign: "middle" }}
        src={`${MEDIUM_CDN}/${imageId}`}
      />
    </ImageWrapper>
  </ExternalLink>
);

const PressArticle = ({ article }) => (
  <Box direction="row-responsive" gap="large">
    <Box basis="1/4">
      <Image
        style={{ width: "100%", maxWidth: 128 }}
        src={article.agency.logo.file.url}
        alt={article.agency.logo.file.fileName}
      />
    </Box>
    <Box basis="3/4">
      <PostInfo
        title={article.articleTitle}
        subtitle={article.articleSummary.articleSummary}
        link={article.articleLink}
        heading="3"
      />
    </Box>
  </Box>
);

const MediumPost = ({ post }) => (
  <>
    <Box margin={{ bottom: "medium" }}>
      <LinkedMediumImage
        imageId={post.node.virtuals.previewImage.imageId}
        slug={post.node.uniqueSlug}
      />
    </Box>
    <PostInfo
      title={post.node.title}
      subtitle={post.node.virtuals.subtitle}
      link={`${MEDIUM_URL}${post.node.uniqueSlug}`}
      heading="3"
    />
  </>
);

const HighlightPost = ({ post }) => (
  <Grid align="start" mt="">
    <Column span={{ medium: 10, large: 6 }}>
      <Box margin={{ bottom: "medium" }}>
        <LinkedMediumImage
          imageId={post.virtuals.previewImage.imageId}
          slug={post.uniqueSlug}
        />
      </Box>
    </Column>
    <Spacer width={2} />
    <Column span={{ medium: 10, large: 4 }}>
      <PostInfo
        title={post.title}
        subtitle={post.virtuals.subtitle}
        link={`${MEDIUM_URL}${post.uniqueSlug}`}
      />
    </Column>
  </Grid>
);

const PostInfo = ({ title, subtitle, link, heading }) => (
  <div>
    <Heading level={heading || "1"} lined={heading !== "3" ? true : false}>
      {title}
    </Heading>
    <Paragraph margin={{ bottom: "medium" }}>{subtitle}</Paragraph>
    <Button plain target="_blank" rel="noopener noreferrer" href={link}>
      Read more...
    </Button>
  </div>
);

export { PostInfo, HighlightPost, MediumPost, PressArticle, LinkedMediumImage };
