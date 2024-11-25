
# **Les Misérables - Character Importance**

## **Overview**

This React/Vite application calculates an importance score for characters in the novel Les Misérables based on different interpretations of their connections. The app provides this data to ReGraph's Chart component to render an interactive visual representation. The goal is to identify and highlight the most important characters in the novel.

 - Options to select different "importance" standards
 - Responsive for desktops as well as mobile devices
 - Some accessibility features implemented
 - Unit tests and some integration tests have been added (Jest/RTL)

**Constraints / methodology**

This task was open ended in terms of both features and time. So I imposed some loose limits. I gave myself **2 weeks** to submit the work (I have had and continue to have ongoing job applications). In that time I would learn the features of ReGraph (documentation and videos), make decisions about which features I wanted to use and how I would like to present the data, and thus structure my app. I decided to use **JS over TS** mainly because it is less time consuming, and thus would allow me to learn more of ReGraph's features. There are some things I would have liked to do but these would require more time. These are mentioned under ***Future developments*** at the end of this readme file.

**Running the project**

Requires Node, I used version `21.3.0`.

To run the project, make sure node modules are installed:

`npm i` in the root directory.

Then `npm run dev` and go to the localhost address listed in the terminal response.


## **Measuring Importance**

There are many different ways we could measure importance, according to different subjective standards. Therefore I have provided a few different selectable options. Many more are possible.

The application offers the following methods to measure importance:

-   **Total value of source connections**: The sum of connections made by the character.
-   **Total value of target connections**: The sum of connections received by the character.
-   **Total value of both**: The sum of both source and target connections.
-   **Total number of direct connections**: The total number of connections made or received by the character, not counting the value of those connections.

By default, the app uses the total value of both source and target connections for each node, as for me, both listening and speaking may imply importance.

SNA / centrality measures would allow for us to gauge other standards of importance (degrees, betweenness, closeness, etc...), and these could be added to the list of options.

## **High Scores**

The application displays a list of characters with their corresponding importance scores, depending which standard has been used, in the sidebar.

## **Data Visualisation**

The size of each node represents it's relative value according to the importance standard used in calculation. Proportional scaling has been applied to the node size to minimise extreme differences.

Hovering on individual nodes allows us to see a summary of the data on them in a tooltip.

Clicking on a node will highlight all of their links to other nodes (not groups). The width of the link indicates the value of the link.

Nodes are organised into groups, if no nodes are selected, links show within groups between individuals, and between groups. There is currently no view of links between groups and individual nodes.


## **Special Cases**

-   **Orange nodes**: These nodes are special cases where they are either never a target or never a source.

## **Future improvements**

This application can be extended to support more complex network analysis and visualisation.

**SNA / centrality measures** could be made available in the selectable options for the standard of importance (degrees, betweenness, closeness, etc...).

I experimented with ReGraph features to understand their utility, some proved more time consuming and less critical to what I wanted to achieve. **Donuts** (would have been cool), and **Annotations** (which didn't seem to do exactly what I wanted so I used tooltips instead).

I would add **more integration tests**, in particular relating the Chart component renders. I did some initial experiments with getItemInfo but ran out of time.

I would have also liked to use **Vitest** but it's new to me.

I prefer to use CSS modules but for such a small app this seemed overkill. Likewise for using Tailwind or using ShadCN.

I could have added some interactivity, or shown data on the links. I can imagine this being useful for group-to-group links in particular.

This application model could be further abstracted and would lend itself to other use cases, such as WhatsApp analytics, where message meta data (source, target, number of interactions) is available but the content of each message is encrypted.
