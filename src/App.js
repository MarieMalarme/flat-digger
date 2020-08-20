import React from 'react'
import { generate_css } from 'atomify'
import { Component, Div } from 'atomify/flagify'

import { flats } from './flats.data.js'

import './App.css'

generate_css()

const App = () => (
  <Page>
    {flats.map((flat, i) => (
      <Flat flat={flat} i={i} />
    ))}
  </Page>
)

const Flat = ({ flat, i }) => (
  <Wrapper>
    <Tags>
      <TagsType tags={flat.tags.pros} type="pros" />
      <TagsType tags={flat.tags.cons} type="cons" />
    </Tags>
    <Card href={flat.url} target="_blank">
      <GeneralInfo flat={flat} />
      <Specs>
        <Spec flat={flat} type="surface" data={flat.surface} />
        <Spec flat={flat} type="price" data={flat.price} />
      </Specs>
      <Image
        style={{
          zIndex: -1,
          background: `${image_bg} url(${flat.img})`,
        }}
      />
    </Card>
  </Wrapper>
)

const TagsType = ({ tags, type }) =>
  tags.map((tag) => (
    <Tag
      style={{
        boxShadow: type === 'pros' ? tag_shadow_out : tag_shadow_in,
      }}
    >
      {tag}
    </Tag>
  ))

const GeneralInfo = ({ flat }) => (
  <Div flex flex_column jc_between>
    <Data>
      <Header>Location</Header>
      <Div mt10 fs40>
        {flat.freguesia}
      </Div>
    </Data>
    <Div fs14>
      <Div mb5>Available on {flat.availability}</Div>
      <Div>Posted on {flat.posted}</Div>
    </Div>
  </Div>
)

const Spec = ({ flat, type, data }) => {
  const surface = type === 'surface'
  const price = type === 'price'
  const unit = (surface && 'm²') || (price && '€')
  const detail =
    (surface && `${flat.space} - ${flat.outdoor || 'No outdoor'}`) ||
    (price && flat.bills ? 'Bills included' : 'Without bills')

  return (
    <Data mr100={surface}>
      <Header>{type}</Header>
      <Div fs80>
        {data}
        {unit}
      </Div>
      <Detail>{detail}</Detail>
    </Data>
  )
}

const Page = Component.ma100.div()
const Wrapper = Component.mb100.div()
const Card = Component.relative.pa50.mb70.indigo5.h300.flex.jc_between.pointer.a()
const Tags = Component.mb30.flex.div()
const Tag = Component.ls2.pv10.ph20.b_rad25.mr30.fs11.grey2.div()
const Specs = Component.flex.div()
const Header = Component.bb.b_indigo5.pb5.mb5.capitalize.div()
const Data = Component.flex.flex_column.div()
const Detail = Component.mt5.fs15.text_right.div()
const Image = Component.w100p.h100p.absolute.f_gray100.o90.t0.l0.div()

const image_bg = `linear-gradient(rgba(230,230,230,1) 0%, rgba(0,0,0,0) 40%, rgba(0,0,0,0) 60%, rgba(230,230,230,1) 100%), center / cover`
const tag_shadow_in = `inset 2px 2px 5px rgba(0, 0, 0, 0.15), inset -3px -2px 7px rgba(255, 255, 255, 0.8)`
const tag_shadow_out = `3px 3px 7px rgba(0, 0, 0, 0.1), -4px -4px 7px rgba(255, 255, 255, 0.7)`

export default App
