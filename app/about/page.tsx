"use client";
import Link from "next/link";
import { Navigation } from "../components/nav";

export default function About() {
	return (
		<div className="relative pb-16">
			<Navigation />
			<div className="px-6 pt-20 mx-auto space-y-8 max-w-7xl lg:px-8 md:space-y-16 md:pt-24 lg:pt-32">
				<div className="max-w-2xl mx-auto lg:mx-0">
					<h2 className="text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl">
						About Me
					</h2>
					<p className="mt-4 text-zinc-400">
						Cloud AI Engineer focused on building reliable, scalable, and automated cloud systems.
					</p>
				</div>
				<div className="w-full h-px bg-zinc-800" />

				<div className="max-w-2xl mx-auto lg:mx-0">
					<div className="text-zinc-400 space-y-6 text-lg leading-relaxed">
						<p>
							I'm a Cloud AI Engineer based in Canada, focused on building high-performance cloud systems that are reliable, secure, and built for real-world production use.
						</p>
						<p>
							Currently, I work as a Cloud and AI Engineer at Vosyn, where I design and deploy infrastructure for machine learning workloads. My work centers on transforming traditional systems into scalable, cost-efficient, and cloud-native architectures.
						</p>
						<p>
							I specialize in Infrastructure as Code using Terraform and CloudFormation, building CI/CD pipelines, and deploying AI-driven services across AWS and GCP. I enjoy working on systems that require strong architecture thinking, especially around resilience, automation, and observability.
						</p>
						<p className="font-medium text-zinc-200">
							My core focus is simple: Build systems that work, scale, and don't break under pressure.
						</p>
						<p>
							From multi-region disaster recovery setups to event-driven processing pipelines and microservice-based AI platforms, I care about designing systems that are not just functional, but dependable and efficient.
						</p>
						<p>
							I believe the best cloud systems are the ones you don't have to think about. They run quietly, scale automatically, and handle failure without disruption.
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
