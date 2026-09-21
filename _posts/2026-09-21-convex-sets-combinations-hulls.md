---
layout: post
lang: en
language: en
translation_url: /zh/2026-09-21-convex-sets-combinations-hulls/
permalink: /2026-09-21-convex-sets-combinations-hulls/
title: Understanding Convex Sets, Combinations, and Hulls
subtitle: From a line segment to a proof that all convex combinations form the convex hull
tags: [Mathematics, Linear Algebra]
readtime: true
math: true
---

I studied linear algebra and became reasonably comfortable with the calculations. Recently, the statement that all convex combinations form the convex hull made me pause. A rubber band around a collection of points was easy enough to picture. The sum of weighted vectors left several steps I wanted to understand.

Why does a weighted sum describe a line segment? Why do the new weights in the proof still add up to one? And why does the algebra give exactly the smallest convex region containing the points?

This article works through those steps. Everything takes place in Euclidean space, with mostly two-dimensional examples. Once an origin is chosen, a point can be represented by its coordinate vector. A segment between vectors will mean the segment between the points represented by those coordinates.

## Basic concepts: from line segments to convex hulls

### Start with a line segment

For two points $$u$$ and $$v$$, the displacement from $$u$$ to $$v$$ is $$v-u$$. Starting at $$u$$ and taking a fraction $$t$$ of that displacement gives

$$
p(t)=u+t(v-u)=(1-t)u+tv.
\label{eq:segment}
$$

At $$t=0$$ we are at $$u$$; at $$t=1$$ we reach $$v$$. Intermediate values take us part of the way along the same direction. As $$t$$ varies from zero to one, we trace the entire segment. Values outside that interval extend beyond its endpoints.

For example, let $$u=(2,0)$$ and $$v=(0,2)$$. Then

$$
p(t)=(2-2t,\,2t).
\label{eq:segment-example}
$$

| $$t$$ | $$p(t)$$ | Position |
| --- | --- | --- |
| 0 | $$(2,0)$$ | First endpoint |
| 0.25 | $$(1.5,0.5)$$ | A quarter of the way along |
| 0.5 | $$(1,1)$$ | Midpoint |
| 1 | $$(0,2)$$ | Second endpoint |
{: .three-line}

Equation $$\eqref{eq:segment}$$ comes from displacement and vector addition. We have not assumed anything about convexity, so using the formula to prove convexity later will not be circular.

### Convexity is a test involving two points

A set is convex when the segment between any two of its points stays entirely in the set. In symbols,

$$
u,v\in K,\quad 0\leq t\leq1
\quad\Longrightarrow\quad
(1-t)u+tv\in K.
\label{eq:convex-set}
$$

A filled disk and a filled rectangle pass this test. A circle consisting only of its circumference does not. Choose the two endpoints of a diameter. Their connecting segment passes through the interior, which is excluded from that set.

A region with an inward notch can also fail the test. One pair whose segment leaves the region is enough to show nonconvexity. To establish convexity, the condition must hold for every pair.

The boundary does not need to be curved. A line segment is a convex set, and so is a single point. The usual distinction here is between convex and nonconvex sets; “concave set” is not the general counterpart used for every set that fails this test.

### A convex combination restricts the weights

A linear combination multiplies vectors by coefficients and adds them. A convex combination requires those coefficients to be nonnegative and to sum to one.

For points $$p_1,\ldots,p_n$$, one convex combination is

$$
p=\sum_{i=1}^{n}\lambda_i p_i,
\qquad \lambda_i\geq0,
\qquad \sum_{i=1}^{n}\lambda_i=1.
\label{eq:convex-combination}
$$

It is a weighted average of positions. With two points, write the weights as $$1-t$$ and $$t$$, and the segment formula in $$\eqref{eq:segment}$$ appears again.

Both restrictions matter. For $$u=(2,0)$$ and $$v=(0,2)$$, the coefficients 2 and -1 sum to one, but $$2u-v=(4,-2)$$ lies outside the segment. The coefficients 1 and 1 are nonnegative, but $$u+v=(2,2)$$ also lies outside it.

One convex combination produces one point. Allowing all admissible weights produces a set of points.

### What the convex hull contains

The convex hull of a collection of points is the smallest convex set containing them. “Smallest” refers to set inclusion. Every convex set containing the original points must also contain their convex hull.

In two dimensions, picture pins at the points and a taut rubber band stretched around the outside. The rubber band represents the boundary. The full convex hull includes the enclosed region too.

If four points are the corners of a square and a fifth is at its center, their hull is the entire filled square. The center point does not change its boundary. Connecting the correct outer vertices in perimeter order with a pen draws that same boundary.

Could we save area by bending inward through gaps between points? Only if the resulting set remains convex. If the notch removes part of a segment between two retained points, convexity is lost. Containing the points and remaining convex must hold together.

We can now connect this geometric definition to the algebra of convex combinations.

## Proof: why all convex combinations form the convex hull

Let $$S=\{p_1,\ldots,p_n\}$$, and let $$C$$ be the set of all convex combinations of these points. Three steps establish the result.

### C contains the original points

To obtain $$p_k$$, set $$\lambda_k=1$$ and all other weights to zero. These are valid weights, so $$S\subseteq C$$.

### C is convex

Take any $$u,v\in C$$. Each has a convex-combination representation,

$$
u=\sum_i a_i p_i,
\qquad
v=\sum_i b_i p_i,
\label{eq:two-combinations}
$$

where $$a_i,b_i\geq0$$ and $$\sum_i a_i=\sum_i b_i=1$$.

We must show that the whole segment between $$u$$ and $$v$$ lies in $$C$$. Using the segment formula $$\eqref{eq:segment}$$ derived from displacement, for $$0\leq t\leq1$$ we have

$$
\begin{aligned}
(1-t)u+tv
&=(1-t)\sum_i a_i p_i+t\sum_i b_i p_i\\
&=\sum_i\bigl((1-t)a_i+tb_i\bigr)p_i.
\end{aligned}
\label{eq:combined-weights}
$$

The new weights are $$c_i=(1-t)a_i+tb_i$$. Every term is nonnegative, so $$c_i\geq0$$. Since $$t$$ is the same for every index, it can be taken outside the sums,

$$
\begin{aligned}
\sum_i c_i
&=(1-t)\sum_i a_i+t\sum_i b_i\\
&=(1-t)\cdot1+t\cdot1\\
&=1.
\end{aligned}
\label{eq:weight-sum}
$$

Equation $$\eqref{eq:weight-sum}$$ shows that the sum of the new weights is one; the individual weights can differ. Each original group carries a total weight of one. Taking a fraction $$1-t$$ of the first and a fraction $$t$$ of the second preserves that total.

The resulting point is still a convex combination of the original points and therefore belongs to $$C$$. This holds everywhere along the segment, proving that $$C$$ is convex.

### Every convex set containing S must contain C

Let $$K$$ be any convex set containing all the original points. Convexity already tells us that $$K$$ contains all convex combinations of any two of them. Combinations of more points can be built through repeated two-point combinations.

For three points, suppose the nonnegative weights sum to one. If $$\lambda_3<1$$, first combine the first two points,

$$
q=
\frac{\lambda_1}{1-\lambda_3}p_1
+\frac{\lambda_2}{1-\lambda_3}p_2.
\label{eq:normalized-pair}
$$

The two coefficients are nonnegative and sum to one, so $$q\in K$$. Then combine $$q$$ with $$p_3$$,

$$
(1-\lambda_3)q+\lambda_3p_3
=\lambda_1p_1+\lambda_2p_2+\lambda_3p_3\in K.
\label{eq:three-point-combination}
$$

If $$\lambda_3=1$$, the result is simply $$p_3$$, which is already in $$K$$. The same argument extends by induction to any finite number of points, grouping the earlier points before combining them with the last one.

Thus $$C\subseteq K$$. Together, the three steps show that $$C$$ contains the original points, is convex, and is contained in every other convex set that contains those points. It is exactly their convex hull.

The proof above treats a finite point set. For an arbitrary set, its convex hull is likewise the set of all finite convex combinations of its points. Each individual combination uses only finitely many points.

## Example: work through a triangle

Take $$A=(0,0)$$, $$B=(2,0)$$, and $$D=(0,2)$$. Their convex combinations have the form

$$
\lambda_A A+\lambda_B B+\lambda_D D
=(2\lambda_B,\,2\lambda_D).
\label{eq:triangle-point}
$$

Call this point $$(x,y)$$. Nonnegative weights summing to one imply

$$
x\geq0,\qquad y\geq0,\qquad x+y\leq2.
\label{eq:triangle-region}
$$

The inequalities in $$\eqref{eq:triangle-region}$$ describe the filled triangle in the first quadrant bounded by the coordinate axes and the line $$x+y=2$$, including its boundary.

Conversely, any point in that triangle gives valid weights,

$$
\lambda_B=\frac{x}{2},\qquad
\lambda_D=\frac{y}{2},\qquad
\lambda_A=1-\frac{x+y}{2}.
\label{eq:triangle-weights}
$$

Substituting $$(0.5,0.5)$$ into $$\eqref{eq:triangle-weights}$$ gives the weights $$\lambda_A=0.5$$ and $$\lambda_B=\lambda_D=0.25$$. The point $$(1.5,1.5)$$ would require $$\lambda_A=-0.5$$, violating nonnegativity and placing it outside the hull. The geometric boundary and the algebraic constraints give exactly the same answer.

## Why introduce the convex hull at all?

At this point, convex sets, convex combinations, and convex hulls may sound like several ways to say “avoid inward dents.” The convex hull adds a precise operation: it turns a discrete collection of points into the smallest region with a clear convex boundary. It answers not only whether a set is convex, but also what the smallest convex container must be when all the points have to fit inside one.

That is useful in computational geometry. Given a collection of points, its hull boundary gives the outer shape, which can then support calculations of area, perimeter, intersections, or collision ranges. Many points may lie inside the hull without changing its boundary, so the hull also compresses the information relevant to the outside shape.

The same idea appears naturally in optimization. For a linear objective, the maximum or minimum over all convex combinations of finitely many points can be found among the original points. The convex hull turns a finite list of candidates into a continuous region while preserving the boundary structure that linear objectives care about. This is one reason convex sets appear so often in linear programming and convex optimization.

The hull is still an outer envelope. It fills gaps between the original points, and a point inside the hull need not be physically realizable or present in the data. When the points represent reachable robot positions, observed samples, or safe physical states, the convex hull is useful as a conservative approximation and a geometric tool, but it does not automatically replace the original set.
