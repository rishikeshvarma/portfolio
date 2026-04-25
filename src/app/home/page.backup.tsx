"use client";

import {
  Avatar,
  Button,
  Column,
  Flex,
  Heading,
  Icon,
  IconButton,
  Input,
  SmartImage,
  Tag,
  Text,
  Textarea,
} from "@/once-ui/components";
import { baseURL } from "@/app/resources";
import TableOfContents from "@/components/about/TableOfContents";
import styles from "@/components/about/about.module.scss";
import { person, about, social } from "@/app/resources/content";
import React from "react";
import { Meta, Schema } from "@/once-ui/modules";
import emailjs from 'emailjs-com';

export default function About() {
  const structure = [
    {
      title: about.intro.title,
      display: about.intro.display,
      items: [],
    },
    {
      title: about.work.title,
      display: about.work.display,
      items: about.work.experiences.map((experience) => experience.company),
    },
    {
      title: about.studies.title,
      display: about.studies.display,
      items: about.studies.institutions.map((institution) => institution.name),
    },
    {
      title: about.technical.title,
      display: about.technical.display,
      items: about.technical.categories.map((category) => category.title),
    },
    {
      title: about.projects.title,
      display: about.projects.display,
      items: about.projects.items.map((project) => project.name),
    },
    {
      title: about.contact.title,
      display: about.contact.display,
      items: [],
    },
  ];
  // Contact form state and handler
  const [form, setForm] = React.useState({ name: '', email: '', time: '', message: '' });
  const [sending, setSending] = React.useState(false);
  const [sent, setSent] = React.useState(false);
  const [error, setError] = React.useState('');
  // Ref for contact section
  const contactRef = React.useRef<HTMLDivElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSent(false);
    if (!form.name || !form.email || !form.message) {
      setError('Please fill in all fields.');
      return;
    }
    setSending(true);
    const timeNow = new Date().toLocaleString();
    try {
      await emailjs.send(
        'service_qz4w226',
        'template_g0pxn4b',
        {
          name: form.name,
          email: form.email,
          time: timeNow,
          message: form.message,
        },
        '_fO2IOOvUvOgiEeHI'
      );
      setSent(true);
      setForm({ name: '', email: '', time: '', message: '' });
    } catch (err) {
      setError('Failed to send message. Please try again later.');
    }
    setSending(false);
  };

  // Scroll to contact form handler
  const scrollToContact = (e?: React.MouseEvent) => {
    e?.preventDefault();
    contactRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Column maxWidth="m">
      <Schema
        as="webPage"
        baseURL={baseURL}
        title={about.title}
        description={about.description}
        path={about.path}
        image={`${baseURL}/og?title=${encodeURIComponent(about.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      {about.tableOfContent.display && (
        <Column
          left="0"
          style={{ top: "50%", transform: "translateY(-50%)" }}
          position="fixed"
          paddingLeft="24"
          gap="32"
          hide="s"
        >
          <TableOfContents structure={structure} about={about} />
        </Column>
      )}
      <Flex fillWidth mobileDirection="column" horizontal="center">
        {about.avatar.display && (
          <Column
            className={styles.avatar}
            position="sticky"
            minWidth="160"
            paddingX="l"
            paddingBottom="xl"
            gap="m"
            flex={3}
            horizontal="center"
          >
            <Avatar src={person.avatar} size="xl" />
            <Flex gap="8" vertical="center">
              <Icon onBackground="accent-weak" name="globe" />
              {person.location}
            </Flex>
            {person.languages.length > 0 && (
              <Flex wrap gap="8">
                {person.languages.map((language, index) => (
                  <Tag key={language} size="l">
                    {language}
                  </Tag>
                ))}
              </Flex>
            )}
          </Column>
        )}
        <Column className={styles.blockAlign} flex={9} maxWidth={40}>
          <Column
            id={about.intro.title}
            fillWidth
            minHeight="160"
            vertical="center"
            marginBottom="32"
          >
            {about.calendar.display && (
              <Flex
                fitWidth
                border="brand-alpha-medium"
                className={styles.blockAlign}
                style={{
                  backdropFilter: "blur(var(--static-space-1))",
                }}
                background="brand-alpha-weak"
                radius="full"
                padding="4"
                gap="8"
                marginBottom="m"
                vertical="center"
              >
                <Icon paddingLeft="12" name="calendar" onBackground="brand-weak" />
                <Flex paddingX="8">Schedule a call</Flex>
                <IconButton
                  onClick={scrollToContact}
                  data-border="rounded"
                  variant="secondary"
                  icon="chevronRight"
                />
              </Flex>
            )}
            <Heading className={styles.textAlign} variant="display-strong-xl">
              {person.name}
            </Heading>
            <Text
              className={styles.textAlign}
              variant="display-default-xs"
              onBackground="neutral-weak"
            >
              {person.role}
            </Text>
            {social.length > 0 && (
              <Flex className={styles.blockAlign} paddingTop="20" paddingBottom="8" gap="8" wrap horizontal="center" fitWidth data-border="rounded">
                {social.map(
                  (item) =>
                    item.link && (
                        <React.Fragment key={item.name}>
                            <Button
                                className="s-flex-hide"
                                key={item.name}
                                href={item.link}
                                prefixIcon={item.icon}
                                label={item.name}
                                size="s"
                                variant="secondary"
                            />
                            <IconButton
                                className="s-flex-show"
                                size="l"
                                key={`${item.name}-icon`}
                                href={item.link}
                                icon={item.icon}
                                variant="secondary"
                            />
                        </React.Fragment>
                    ),
                )}
              </Flex>
            )}
          </Column>

          {about.intro.display && (
            <Column textVariant="body-default-l" fillWidth gap="m" marginBottom="xl">
              {about.intro.description}
            </Column>
          )}

          {about.work.display && (
            <>
              <Heading as="h2" id={about.work.title} variant="display-strong-s" marginBottom="m">
                {about.work.title}
              </Heading>
              <Column fillWidth gap="l" marginBottom="40">
                {about.work.experiences.map((experience, index) => (
                  <Column key={`${experience.company}-${experience.role}-${index}`} fillWidth>
                    <Flex fillWidth horizontal="space-between" vertical="end" marginBottom="4">
                      <Text id={experience.company} variant="heading-strong-l">
                        {experience.company}
                      </Text>
                      <Text variant="heading-default-xs" onBackground="neutral-weak">
                        {experience.timeframe}
                      </Text>
                    </Flex>
                    <Text variant="body-default-s" onBackground="brand-weak" marginBottom="m">
                      {experience.role}
                    </Text>
                    <Column as="ul" gap="16">
                      {experience.achievements.map((achievement: JSX.Element, index: number) => (
                        <Text
                          as="li"
                          variant="body-default-m"
                          key={`${experience.company}-${index}`}
                        >
                          {achievement}
                        </Text>
                      ))}
                    </Column>
                  </Column>
                ))}
              </Column>
            </>
          )}

          {about.studies.display && (
            <>
              <Heading as="h2" id={about.studies.title} variant="display-strong-s" marginBottom="m">
                {about.studies.title}
              </Heading>
              <Column fillWidth gap="l" marginBottom="40">
                {about.studies.institutions.map((institution, index) => (
                  <Column key={`${institution.name}-${index}`} fillWidth gap="4">
                    <Flex fillWidth horizontal="space-between" vertical="end" marginBottom="4">
                      <Text id={institution.name} variant="heading-strong-l">
                        {institution.name}
                      </Text>
                      {institution.timeframe && (
                        <Text variant="heading-default-xs" onBackground="neutral-weak">
                          {institution.timeframe}
                        </Text>
                      )}
                    </Flex>
                    <Text variant="heading-default-xs" onBackground="neutral-weak">
                      {institution.description}
                    </Text>
                  </Column>
                ))}
              </Column>
            </>
          )}

          {about.technical.display && (
            <>
              <Heading
                as="h2"
                id={about.technical.title}
                variant="display-strong-s"
                marginBottom="40"
              >
                {about.technical.title}
              </Heading>
              <Column fillWidth gap="l">
                {about.technical.categories.map((category, index) => (
                  <Column key={`${category.title}-${index}`} fillWidth gap="m">
                    <Text variant="heading-strong-l">{category.title}</Text>
                    <Column as="ul" gap="xs" style={{ paddingLeft: 24 }}>
                      {category.skills.map((skill, skillIndex) => (
                        <li key={`${skill}-${skillIndex}`} style={{ listStyle: 'disc' }}>
                          <Text variant="body-strong-m">{skill}</Text>
                          {about.technical.descriptions[skill as keyof typeof about.technical.descriptions] && (
                            <Text variant="body-default-s" onBackground="neutral-weak">
                              {about.technical.descriptions[skill as keyof typeof about.technical.descriptions]}
                            </Text>
                          )}
                        </li>
                      ))}
                    </Column>
                  </Column>
                ))}
              </Column>
            </>
          )}

          {about.projects && about.projects.display && (
            <>
              <Heading as="h2" id={about.projects.title} variant="display-strong-s" marginBottom="m">
                {about.projects.title}
              </Heading>
              <Column fillWidth gap="l" marginBottom="40">
                {about.projects.items.map((project, index) => (
                  <Column key={`${project.name}-${index}`} fillWidth gap="xs">
                    <Text variant="heading-strong-m">{project.name}</Text>
                    <Text variant="body-default-m" onBackground="neutral-weak">{project.description}</Text>
                    <Flex gap="m">
                      {project.link && (
                        <Button
                          href={project.link}
                          label="GitHub"
                          size="s"
                          variant="secondary"
                          target="_blank"
                          rel="noopener noreferrer"
                        />
                      )}
                      {project.website && (
                        <Button
                          href={project.website}
                          label="Website"
                          size="s"
                          variant="primary"
                          target="_blank"
                          rel="noopener noreferrer"
                        />
                      )}
                    </Flex>
                  </Column>
                ))}
              </Column>
            </>
          )}

          {about.contact.display && (
            <Column ref={contactRef} id={about.contact.title} fillWidth gap="m" marginTop="xl" marginBottom="xl">
              <Heading as="h2" variant="display-strong-s" marginBottom="m">
                {about.contact.title}
              </Heading>
              <Text variant="body-default-m" marginBottom="m">
                {about.contact.description}
              </Text>
              <form onSubmit={handleSubmit} style={{ maxWidth: 400 }}>
                <Column gap="m">
                  <Input
                    id="contact-name"
                    label="Your Name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                  <Input
                    id="contact-email"
                    label="Your Email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                  <Textarea
                    id="contact-message"
                    label="Your Message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    lines={5}
                  />
                  {error && <Text variant="body-default-s" onBackground="danger-weak">{error}</Text>}
                  {sent && <Text variant="body-default-s" onBackground="success-weak">Message sent!</Text>}
                  <Button
                    type="submit"
                    label={sending ? 'Sending...' : 'Send Message'}
                    disabled={sending}
                    variant="primary"
                  />
                </Column>
              </form>
            </Column>
          )}
        </Column>
      </Flex>
    </Column>
  );
}
