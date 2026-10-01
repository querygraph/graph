# NoJVM License

**Version 1.0**

## About this license

The **NoJVM License** is a free-culture license modeled on the structure and
spirit of the Creative Commons Attribution 4.0 International (CC BY 4.0)
license, with one additional restriction: the **JVM Exclusion** (Section 2(b)).
In short, the Licensed Material is free to use, share, and adapt — for any
purpose, including commercially — with attribution, **except** that it may not
be loaded into, executed on, compiled for, or incorporated into any Java
Virtual Machine (JVM) based system.

This is an independent license. It is **not** an official Creative Commons
license, and Creative Commons does not author, endorse, or support it. The
canonical CC BY 4.0 text it draws from is available at
<https://creativecommons.org/licenses/by/4.0/legalcode>.

## Summary (not a substitute for the full terms below)

**You are free to:**

- **Share** — copy and redistribute the material in any medium or format.
- **Adapt** — remix, transform, and build upon the material for any purpose,
  including commercially.

**Under the following terms:**

- **Attribution** — You must give appropriate credit, provide a link to this
  license, and indicate if changes were made. You may do so in any reasonable
  manner, but not in any way that suggests the licensor endorses you or your use.
- **No JVM Use** — You may **not** load, execute, embed, compile, transpile, or
  otherwise incorporate the Licensed Material, in whole or in part, into any Java
  Virtual Machine (JVM) based system, runtime, or toolchain (the **JVM
  Exclusion**). In particular, it may **not** be loaded into any JVM-based data
  processing, stream processing, or graph database system — **including for
  public education purposes**. See Section 2(b) for the full definition and scope.
- **No additional restrictions** — You may not apply legal terms or
  technological measures that legally restrict others from doing anything this
  license permits, except as required by the JVM Exclusion itself.

---

## Full license terms

By exercising the Licensed Rights (defined below), You accept and agree to be
bound by the terms and conditions of this NoJVM License ("Public License"). To
the extent this Public License may be interpreted as a contract, You are granted
the Licensed Rights in consideration of Your acceptance of these terms and
conditions, and the Licensor grants You such rights in consideration of benefits
the Licensor receives from making the Licensed Material available under these
terms and conditions.

### Section 1 — Definitions

a. **Licensed Material** means the artistic, literary, software, data, or other
   work, database, or other material to which the Licensor applied this Public
   License.

b. **Licensed Rights** means the rights granted to You subject to the terms and
   conditions of this Public License, which are limited to all Copyright and
   Similar Rights that apply to Your use of the Licensed Material and that the
   Licensor has authority to license.

c. **Copyright and Similar Rights** means copyright and/or similar rights
   closely related to copyright including, without limitation, performance,
   broadcast, sound recording, and Sui Generis Database Rights, without regard to
   how the rights are labeled or categorized.

d. **Licensor** means the individual(s) or entity(ies) granting rights under this
   Public License.

e. **You** (and **Your**) means the individual or entity exercising the Licensed
   Rights under this Public License.

f. **Share** means to provide material to the public by any means or process that
   requires permission under the Licensed Rights, such as reproduction, public
   display, public performance, distribution, dissemination, communication, or
   importation, and to make material available to the public including in ways
   that members of the public may access the material from a place and at a time
   individually chosen by them.

g. **Adapted Material** means material subject to Copyright and Similar Rights
   that is derived from or based upon the Licensed Material and in which the
   Licensed Material is translated, altered, arranged, transformed, or otherwise
   modified in a manner requiring permission under the Copyright and Similar
   Rights held by the Licensor.

h. **JVM** (Java Virtual Machine) means any implementation of the Java Virtual
   Machine specification (including but not limited to HotSpot, OpenJDK, Oracle
   JDK, GraalVM in JVM mode, Eclipse OpenJ9, Azul Zulu, Amazon Corretto, and
   Android's ART/Dalvik insofar as they execute JVM-derived bytecode), together
   with any runtime, interpreter, ahead-of-time or just-in-time compiler, or
   execution environment that consumes, produces, or executes Java bytecode
   (class files) or is designed principally to run programs written for such an
   environment.

i. **JVM-Based System** means any software system, application, service, library,
   framework, container image, build pipeline, or toolchain that runs on,
   targets, embeds, or requires a JVM, or that is written in or compiled to a
   language whose primary or intended execution target is a JVM. This includes,
   without limitation, systems built with or requiring Java, Kotlin, Scala,
   Clojure, Groovy, JRuby, Jython, or any other language compiled to Java
   bytecode, as well as JVM-hosted build and dependency tools (for example,
   Maven, Gradle, sbt, and Ant) when used to load or incorporate the Licensed
   Material into a JVM runtime.

### Section 2 — Scope

a. **License grant.** Subject to the terms and conditions of this Public License,
   the Licensor hereby grants You a worldwide, royalty-free, non-sublicensable,
   non-exclusive, irrevocable (except as stated in Section 6(b)) license to
   exercise the Licensed Rights in the Licensed Material to:

   1. reproduce and Share the Licensed Material, in whole or in part; and
   2. produce, reproduce, and Share Adapted Material,

   for any purpose, whether commercial or non-commercial, **except** as limited
   by the JVM Exclusion in Section 2(b).

b. **JVM Exclusion (the defining restriction of this license).**
   Notwithstanding any other provision of this Public License, the Licensed
   Rights do **not** include, and no license is granted for, any use that loads,
   links, executes, embeds, interprets, compiles, transpiles, packages, or
   otherwise incorporates the Licensed Material or any Adapted Material, in whole
   or in part, into a JVM or a JVM-Based System, or that distributes the Licensed
   Material or Adapted Material in a form primarily intended to be so
   incorporated.

   For clarity, the following are **not permitted** under this Public License:

   1. running, interpreting, or executing the Licensed Material on a JVM;
   2. compiling or transpiling the Licensed Material (or any part of it) to Java
      bytecode or to any language whose intended execution target is a JVM;
   3. bundling, vendoring, or publishing the Licensed Material as, or as part of,
      a JVM artifact (for example, a `.jar`, `.war`, `.ear`, `.class`, or
      Maven/Gradle-published package);
   4. embedding the Licensed Material into an application or service that executes
      within a JVM at runtime; and
   5. loading, ingesting, indexing, or otherwise incorporating the Licensed
      Material into any JVM-based data processing system, stream processing
      system, or graph database — including, without limitation, systems such as
      Apache Hadoop, Apache Spark, Apache Flink, Apache Kafka, Apache Beam,
      Apache Cassandra, Apache Storm, Neo4j, JanusGraph, Apache TinkerPop/Gremlin,
      and comparable JVM-hosted engines — **even when done for public education,
      teaching, research demonstration, or other non-commercial or educational
      purposes**. No educational, academic, or public-interest purpose creates an
      exception to the JVM Exclusion.

   For clarity, the following **are permitted** (subject to the rest of this
   license, including Attribution):

   1. all use in non-JVM languages and runtimes (for example, C, C++, Rust, Go,
      Python, JavaScript/TypeScript on non-JVM engines, Ruby on non-JVM
      interpreters, .NET, Swift, and similar);
   2. reading, studying, quoting, and discussing the Licensed Material;
   3. reproducing and Sharing the Licensed Material for use in non-JVM contexts.

   If You wish to use the Licensed Material in a JVM or JVM-Based System, You must
   obtain a separate written license from the Licensor.

c. **Term.** The term of this Public License is specified in Section 6(a).

d. **Media and formats; technical modifications permitted.** The Licensor
   authorizes You to exercise the Licensed Rights in all media and formats
   whether now known or hereafter created, and to make technical modifications
   necessary to do so, provided such exercise and modifications do not violate
   the JVM Exclusion.

e. **No endorsement.** Nothing in this Public License constitutes or may be
   construed as permission to assert or imply that You are, or that Your use of
   the Licensed Material is, connected with, or sponsored, endorsed, or granted
   official status by, the Licensor or others designated to receive attribution.

### Section 3 — License Conditions

Your exercise of the Licensed Rights is expressly made subject to the following
conditions.

a. **Attribution.** If You Share the Licensed Material (including in modified
   form), You must:

   1. retain the following if it is supplied by the Licensor with the Licensed
      Material:
      - identification of the creator(s) of the Licensed Material and any others
        designated to receive attribution, in any reasonable manner requested by
        the Licensor (including by pseudonym if designated);
      - a copyright notice;
      - a notice that refers to this Public License;
      - a notice that refers to the disclaimer of warranties;
      - a URI or hyperlink to the Licensed Material to the extent reasonably
        practicable;
   2. indicate if You modified the Licensed Material and retain an indication of
      any previous modifications; and
   3. indicate the Licensed Material is licensed under this NoJVM License, and
      include the text of, or the URI or hyperlink to, this Public License.

   You may satisfy the conditions in this Section 3(a) in any reasonable manner
   based on the medium, means, and context in which You Share the Licensed
   Material.

b. **Preservation of the JVM Exclusion.** If You Share the Licensed Material or
   Adapted Material, You must not offer or impose any terms that grant, or
   purport to grant, any recipient the right to use the material in a JVM or
   JVM-Based System, and You must include a clear notice of the JVM Exclusion.
   Any downstream recipient receives the Licensed Rights subject to the same JVM
   Exclusion.

### Section 4 — Sui Generis Database Rights

Where the Licensed Rights include Sui Generis Database Rights that apply to Your
use of the Licensed Material, the Licensor grants You the right to extract,
reuse, reproduce, and Share all or a substantial portion of the contents of the
database, subject to the JVM Exclusion in Section 2(b) and the conditions of
Section 3.

### Section 5 — Disclaimer of Warranties and Limitation of Liability

a. UNLESS OTHERWISE SEPARATELY UNDERTAKEN BY THE LICENSOR, TO THE EXTENT
   POSSIBLE, THE LICENSOR OFFERS THE LICENSED MATERIAL AS-IS AND AS-AVAILABLE,
   AND MAKES NO REPRESENTATIONS OR WARRANTIES OF ANY KIND CONCERNING THE LICENSED
   MATERIAL, WHETHER EXPRESS, IMPLIED, STATUTORY, OR OTHER. THIS INCLUDES,
   WITHOUT LIMITATION, WARRANTIES OF TITLE, MERCHANTABILITY, FITNESS FOR A
   PARTICULAR PURPOSE, NON-INFRINGEMENT, ABSENCE OF LATENT OR OTHER DEFECTS,
   ACCURACY, OR THE PRESENCE OR ABSENCE OF ERRORS, WHETHER OR NOT KNOWN OR
   DISCOVERABLE.

b. TO THE EXTENT POSSIBLE, IN NO EVENT WILL THE LICENSOR BE LIABLE TO YOU ON ANY
   LEGAL THEORY (INCLUDING, WITHOUT LIMITATION, NEGLIGENCE) OR OTHERWISE FOR ANY
   DIRECT, SPECIAL, INDIRECT, INCIDENTAL, CONSEQUENTIAL, PUNITIVE, EXEMPLARY, OR
   OTHER LOSSES, COSTS, EXPENSES, OR DAMAGES ARISING OUT OF THIS PUBLIC LICENSE
   OR USE OF THE LICENSED MATERIAL, EVEN IF THE LICENSOR HAS BEEN ADVISED OF THE
   POSSIBILITY OF SUCH LOSSES, COSTS, EXPENSES, OR DAMAGES.

### Section 6 — Term and Termination

a. This Public License applies for the term of the Copyright and Similar Rights
   licensed here. However, if You fail to comply with this Public License, then
   Your rights under this Public License terminate automatically.

b. Where Your right to use the Licensed Material has terminated under Section
   6(a), it reinstates:

   1. automatically as of the date the violation is cured, provided it is cured
      within 30 days of Your discovery of the violation; or
   2. upon express reinstatement by the Licensor.

   For the avoidance of doubt, this Section 6(b) does not affect any right the
   Licensor may have to seek remedies for Your violations of this Public License,
   including any violation of the JVM Exclusion.

c. Sections 1, 5, 6, and 7 survive termination of this Public License.

### Section 7 — Other Terms and Conditions

a. The Licensor is not bound by any additional or different terms or conditions
   communicated by You unless expressly agreed.

b. Any arrangements, understandings, or agreements regarding the Licensed
   Material not stated herein are separate from and independent of the terms and
   conditions of this Public License.

c. If any provision of this Public License is deemed unenforceable, it shall be
   reformed to the minimum extent necessary to make it enforceable. The JVM
   Exclusion in Section 2(b) is a material term; if it cannot be enforced, no
   license is granted.

---

## How to apply this license

To apply the NoJVM License to your work, include a notice such as:

```
Copyright (c) [year] [name of author or organization]

This work is licensed under the NoJVM License, Version 1.0.
You are free to share and adapt it with attribution, EXCEPT that it may
not be loaded into, executed on, compiled for, or incorporated into any
JVM (Java Virtual Machine) based system. See the LICENSE for the full terms.
```
