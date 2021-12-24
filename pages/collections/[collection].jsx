import React from 'react'
import styled from 'styled-components'
import Flex from 'components/shared/Flex'
import { getAllProductsInCollection, getCollectionSlugs } from 'lib/shopify'
import ProductListings from 'components/products/ProductListings'


const Container = styled(Flex)`
  width: 100%;
`

export default function Home({ products }) {

  console.log({ products })
  return (
    <Container>
      {/* <StoryListing stories={all_posts} /> */}
      <ProductListings products={products} />
      Index Page
    </Container>
  )
}


export async function getStaticPaths() {
  const collectionSlugs = await getCollectionSlugs()

  const paths = collectionSlugs.map((slug) => {    
    const collection = String(slug.node.handle)
    return {
      params: { collection }
    }
  })

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const products = await getAllProductsInCollection(params.collection)
  console.log('products: ', products)
  return {
    props: {
      products
    },
  }
}