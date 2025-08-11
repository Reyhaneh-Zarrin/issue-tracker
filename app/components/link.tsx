import React, { ReactNode } from 'react';
import LinkNext from 'next/link'
import { Link as LinkRadix } from '@radix-ui/themes'

//this custom link is build to enable client side rendering with  react link and have radix link features

interface Props{
    href: string;
    children: ReactNode;
}

const Link = ({href, children}:Props) => {
  return (
    <LinkNext href={href} passHref legacyBehavior>
        <LinkRadix>{children}</LinkRadix>
    </LinkNext>
  )
}

export default Link