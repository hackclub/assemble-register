import React from 'react'

const makeTitle = (title, name) =>
  title === name ? title : `${title} – ${name}`

const Meta = ({
  as: ElementType = React.Fragment,
  name = 'Hack Club', // site name
  title = 'Hack Club', // page title
  description,
  image,
  color = '#ec3750',
  manifest = 'https://assets.hackclub.com/favicons/site.webmanifest',
  children
}) => (
  <ElementType>
    <meta key="og_locale" property="og:locale" content="en_US" />
    <meta key="og_type" property="og:type" content="website" />
    <meta key="og_site" property="og:site_name" content={name} />
    <meta key="tw_site" name="twitter:site" content="@hackclub" />
    <title key="title">{makeTitle(title, name)}</title>
    <meta key="og_title" property="og:title" content={makeTitle(title, name)} />
    <meta
      key="tw_title"
      name="twitter:title"
      content={makeTitle(title, name)}
    />
    {description && (
      <React.Fragment>
        <meta key="desc" name="description" content={description} />
        <meta key="og_desc" property="og:description" content={description} />
        <meta key="tw_desc" name="twitter:description" content={description} />
      </React.Fragment>
    )}
    {image && (
      <React.Fragment>
        <meta key="og_img" property="og:image" content={image} />
        <meta key="tw_card" name="twitter:card" content="summary_large_image" />
        <meta key="tw_img" name="twitter:image" content={image} />
      </React.Fragment>
    )}
    <meta key="theme_color" name="theme-color" content={color} />
    <meta key="tile_color" name="msapplication-TileColor" content={color} />
    <link
      rel="shortcut icon"
      type="image/png"
      href="/favicon.png"
    />
    <link
      rel="icon"
      type="image/png"
      href="/favicon.png"
    />
    <link
      rel="favicon"
      type="image/png"
      href="/favicon.png"
    />
    {manifest && <link key="manifest" rel="manifest" href={manifest} />}
    {children}
  </ElementType>
)

export default Meta